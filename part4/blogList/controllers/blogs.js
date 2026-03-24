const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

blogsRouter.get('/', (request, response) => {
  Blog
    .find({}).populate('user')
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).end()
  }
  const user = await User.find({}).limit(1)
  request.body.user = user[0].id
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  if (!request.body.likes || !request.params.id) {
    return response.status(400).end()
  }
  await Blog.findByIdAndUpdate(request.params.id, { likes: `${request.body.likes}` })
  response.status(202).end()
})

module.exports = blogsRouter
