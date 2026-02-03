const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body
  if (!username || username.length < 3 || !password || password.length < 3) {
    return response.status(400).json({ message: 'Invalid username or password' })
  }
  const saltRounds = 10
  const passWdHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    passWdHash,
    name
  })
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter
