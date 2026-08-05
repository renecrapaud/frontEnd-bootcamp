const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')
const mongoose = require('mongoose')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({}).populate('user')
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).end()
  }
  const user = request.user
  if (!user.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  request.body.user = user.id
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  if (!user.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const id = request.params.id
  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(404).json()
  }
  const blogUsrId = blog._doc.user
  if (user.id.toString() === blogUsrId.toString()) {
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
