const blogsRouter = require('express').Router()
const blogSchema = require('../models/blog')
const mongoose = require('mongoose')
const Blog = mongoose.model('Blog', blogSchema)
const express = require('express')
const app = express()
const logger = require('../utils/logger')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  logger.info(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter
