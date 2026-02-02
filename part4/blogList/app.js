const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
app.use(express.json())

const { mongoUrl } = require('./utils/config')

app.use(cors())
mongoose.connect(mongoUrl)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

module.exports = app
