const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

// GENERAL

describe('general checks', () => {
  test('correct amount of blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
    expect(response.header['content-type']).toMatch(/application\/json/)
  })

  test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')

    for (let blog of response.body) {
      expect(blog.id).toBeDefined()
    }
  })
})

// ADDING

describe('adding a new blog', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('user login -> token verification -> add new blog', async () => {
    const newUser = {
      "username": "jest",
      "name": "jestTester",
      "password": "jest123"
    }

    const newBlog = {
      title: 'jestBlog',
      author: 'jestAuthor',
      url: 'jestUrl',
      likes: 1234
    }

    // Register the user
    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // Log in the user
    const loginResponse = await api.post('/api/login')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // Capture the token from the response
    const token = loginResponse.body.token

    // Create a new note using the token
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('jestBlog')
  })

  test('if likes is missing from the request, likes = 0', async () => {
    const newUser = {
      "username": "jest",
      "name": "jestTester",
      "password": "jest123"
    }

    const newBlog = {
      title: 'jestBlog',
      author: 'jestAuthor',
      url: 'jestUrl',
      // likes: 5 
    }

    // Register the user
    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // Log in the user
    const loginResponse = await api.post('/api/login')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // Capture the token from the response
    const token = loginResponse.body.token

    // Create a new note using the token
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const addedBlogId = response.body.id
    const blogById = await Blog.findById(addedBlogId)
    expect(blogById.likes).toBe(0)
  })
})

describe('adding a blog fails with 401 if token is not provided', () => {

})

describe('making bad requests', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('if title is missing from the request, status code 400', async () => {
    const newUser = {
      "username": "jest",
      "name": "jestTester",
      "password": "jest123"
    }

    const newBlog = {
      // title: missing
      author: 'jestAuthortest6',
      url: 'jestUrl',
      likes: 6
    }

    // Register the user
    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // Log in the user
    const loginResponse = await api.post('/api/login')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // Capture the token from the response
    const token = loginResponse.body.token

    // Create a new note using the token
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.res.statusMessage).toBe('Bad Request')
  })

  test('if url is missing from the request, status code 400', async () => {
    const newUser = {
      "username": "jest",
      "name": "jestTester",
      "password": "jest123"
    }

    const newBlog = {
      title: 'jestBlog',
      author: 'jestAuthor',
      // url: 'jestUrl',
      likes: 6
    }

    // Register the user
    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // Log in the user
    const loginResponse = await api.post('/api/login')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // Capture the token from the response
    const token = loginResponse.body.token

    // Create a new note using the token
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.res.statusMessage).toBe('Bad Request')
  })
})

// UPDATING

describe('updating a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedLikes = blogToUpdate.likes + 1

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: updatedLikes })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)

    expect(updatedBlog.likes).toBe(updatedLikes)
  })
})

// DELETING

describe('deleting a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

// USER ADMINISTRATION & TOKEN AUTHENTICATION

describe('user administration', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'Root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')


    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if username is less than 3 characters long', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ab',
      name: 'Too short username',
      password: 'abc',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username and password should be at least 3 characters long')


    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if password is less than 3 characters long', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'abc',
      name: 'Too short password',
      password: 'ab',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username and password should be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
