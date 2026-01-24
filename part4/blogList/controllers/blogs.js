const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  if(!request.body.title || !request.body.url){
    return response.status(400).end()
  }
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  if(!request.body.likes || !request.params.id){
    return response.status(400).end()
  }
  await Blog.findByIdAndUpdate(request.params.id, {likes: `${request.body.likes}`})
  response.status(202).end()
})

module.exports = blogsRouter
