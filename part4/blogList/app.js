const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
app.use(express.json())

const { mongoUrl } = require('./utils/config')

app.use(cors())
mongoose.connect(mongoUrl)
app.use('/api/blogs', blogsRouter)


module.exports = app
