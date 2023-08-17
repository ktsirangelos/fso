const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// ATTENTION! Errors are handled by 'express-async-errors'

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  // Validation for username and password lengths
  if (username.length < 3 || password.length < 3) {
    return response.status(400).send({
      error: 'Username and password should be at least 3 characters long'
    })
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save();

  response.status(201).json(savedUser);
})

module.exports = usersRouter
