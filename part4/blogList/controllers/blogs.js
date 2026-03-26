const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
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
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  request.body.user = decodedToken.id
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const id = request.params.id
  const blog = await Blog.findById(id)
  const blogUsrId = blog._doc.user
  if (decodedToken.id.toString() === blogUsrId.toString()) {
    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'user not allowed' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  if (!request.body.likes || !request.params.id) {
    return response.status(400).end()
  }
  await Blog.findByIdAndUpdate(request.params.id, { likes: `${request.body.likes}` })
  response.status(202).end()
})

module.exports = blogsRouter
