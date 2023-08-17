const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  { "title": "test1", "author": "test1", "url": "test1", "likes": 1 },
  { "title": "test2", "author": "test2", "url": "test2", "likes": 2 },
  { "title": "test3", "author": "test3", "url": "test3", "likes": 3 }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
  const note = new Blog({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  nonExistingId
}

