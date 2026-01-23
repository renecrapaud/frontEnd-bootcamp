const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const mongoose = require('mongoose')
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

module.exports = blogsRouter
