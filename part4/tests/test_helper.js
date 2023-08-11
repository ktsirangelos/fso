const Blog = require('../models/blog')

const initialBlogs = [
  { "title": "test1", "author": "test1", "url": "test1", "likes": 1 },
  { "title": "test2", "author": "test2", "url": "test2", "likes": 2 },
  { "title": "test3", "author": "test3", "url": "test3", "likes": 3 }
]

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}
