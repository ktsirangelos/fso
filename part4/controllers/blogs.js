const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')

// ATTENTION! Errors are handled by 'express-async-errors'

// GET
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res, next) => {
  const blog = await Blog.findById(req.params.id)

  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

// POST
blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
  const body = req.body
  const user = req.user

  const blog = new Blog({
    title: body.title || '',
    author: body.author || '',
    url: body.url || '',
    likes: body.likes || 0,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

// DELETE
blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const user = req.user

  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.status(404).json({ error: 'blog not found' })
  }

  if (blog.user.toString() !== user.id.toString()) {
    return res.status(403).json({ error: 'operation not allowed' })
  }

  await Blog.findByIdAndRemove(req.params.id);
  res.status(200).json({ message: 'blog successfully deleted' });
})

// PUT
blogsRouter.put('/:id', middleware.userExtractor, async (req, res, next) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })

  res.json(updatedBlog)
})

module.exports = blogsRouter
