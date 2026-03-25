const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
app.use(express.json())
const errorHandler = require('./utils/errorHandler')

const { mongoUrl } = require('./utils/config')

app.use(cors())
mongoose.connect(mongoUrl)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(errorHandler)
module.exports = app
