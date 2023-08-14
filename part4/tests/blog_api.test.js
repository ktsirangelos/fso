const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

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
  }

  const response = await api.post('/api/blogs').send(newBlog)
  expect(response.status).toBe(201)
  expect(response.header['content-type']).toMatch(/application\/json/)

  const addedBlogId = response.body.id;
  const blogById = await Blog.findById(addedBlogId);
  expect(blogById.likes).toBe(0);
})

test('unique identifier is named id', async () => {
  const response = await api.get('/api/blogs')

  for (let blog of response.body) {
    expect(blog.id).toBeDefined()
  }
})

afterAll(async () => {
  await mongoose.connection.close()
})
