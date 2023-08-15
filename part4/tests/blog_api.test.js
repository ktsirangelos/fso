const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('general checks', () => {
  test('correct amount of blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
    expect(response.header['content-type']).toMatch(/application\/json/);
  })

  test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')

    for (let blog of response.body) {
      expect(blog.id).toBeDefined()
    }
  })
})

describe('adding a blog', () => {
  test('a valid note can be added', async () => {
    const newBlog = {
      title: 'test4',
      author: 'test4',
      url: 'test4',
      likes: 4
    }

    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.status).toBe(201)
    expect(response.header['content-type']).toMatch(/application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain('test4')
  })

  test('if likes is missing from the request, likes = 0', async () => {
    const newBlog = {
      title: 'test5',
      author: 'test5',
      url: 'test5'
      // likes: missing
    }

    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.status).toBe(201)
    expect(response.header['content-type']).toMatch(/application\/json/)

    const addedBlogId = response.body.id;
    const blogById = await Blog.findById(addedBlogId);
    expect(blogById.likes).toBe(0);
  })

})

describe('updating a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedLikes = blogToUpdate.likes + 1;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: updatedLikes })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id);

    expect(updatedBlog.likes).toBe(updatedLikes);
  })
})

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

describe('making bad requests', () => {
  test('if title is missing from the request, status code 400', async () => {
    const newBlog = {
      // title: missing
      author: 'test6',
      url: 'test6',
      likes: 6
    }

    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.header['content-type']).toMatch(/application\/json/)
    expect(response.statusCode).toBe(400)
    expect(response.res.statusMessage).toBe('Bad Request')
  })

  test('if url is missing from the request, status code 400', async () => {
    const newBlog = {
      title: 'test7',
      author: 'test7',
      // url: missing
      likes: 7
    }

    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.header['content-type']).toMatch(/application\/json/)
    expect(response.statusCode).toBe(400)
    expect(response.res.statusMessage).toBe('Bad Request')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
