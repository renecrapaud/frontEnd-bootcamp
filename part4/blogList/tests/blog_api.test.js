const {test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const iniBlogList = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
  },
  {
    title: 'this is the new one',
    author: 'my favorite author',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 3,
  },
  {
    title: 'New blog record',
    author: 'the old one',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 9,
  }
]

beforeEach(async () =>{
  await Blog.deleteMany({})
  let blogObject = new Blog(iniBlogList[0])
  await blogObject.save()
  blogObject = new Blog(iniBlogList[1])
  await blogObject.save()
  blogObject = new Blog(iniBlogList[2])
  await blogObject.save()
})

test('blogs are returned as JSON', async () =>{
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('There number of blogs in DB match with test set', async () =>{
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, iniBlogList.length)
})

after(async () => {
  await mongoose.connection.close()
})
