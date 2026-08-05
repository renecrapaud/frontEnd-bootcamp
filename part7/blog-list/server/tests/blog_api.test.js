const { test, after, beforeEach, describe } = require('node:test')
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
    title: 'World cup',
    author: 'chicharito',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 9,
  }
]

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikpob25Eb2UiLCJpZCI6IjY5ODE0ZWNhN2FiZTk2MGNiZjQxZTI5MiIsImlhdCI6MTc3NDU1Mjc5Mn0.h1R0FaZV_9hnx5Mx0ilYIzwxpWlsSDm7Hn0kpfZiq-E';

describe('insert without user', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(iniBlogList[0])
    await blogObject.save()
    blogObject = new Blog(iniBlogList[1])
    await blogObject.save()
    blogObject = new Blog(iniBlogList[2])
    await blogObject.save()
  })

  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('There number of blogs in DB match with test set', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, iniBlogList.length)
  })

  test('The identifier field name is id', async () => {
    const response = await api.get('/api/blogs')
    assert(response.body[0].id)
  })

  test('A valid blog antrance can be aded', async () => {
    const newBlogEntrance =
    {
      title: 'JavaScript is the main web language',
      author: 'Ada Lovelace',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Lovelace123.pdf',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlogEntrance)
      .set('Authorization', `Bearer ${TOKEN}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)
    assert.strictEqual(response.body.length, iniBlogList.length + 1)
    assert(contents.includes('JavaScript is the main web language'))
  })

  test('Add blog antrance fails by missing token', async () => {
    const newBlogEntrance =
    {
      title: 'JavaScript is the main web language',
      author: 'Ada Lovelace',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Lovelace123.pdf',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlogEntrance)
      .expect(401)
      .expect('Content-Type', /application\/json/)

  })

  test('When likes property does not have a value, set it to zero', async () => {
    const newBlogEntrance1 =
    {
      title: 'PHP is the main web language',
      author: 'Dan Abramov',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Abramov456.pdf',
      user: 'usr'
    }
    await api
      .post('/api/blogs')
      .send(newBlogEntrance1)
      .set('Authorization', `Bearer ${TOKEN}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.likes)
    assert.strictEqual(response.body.length, iniBlogList.length + 1)
    assert(contents.includes(0))
  })

  test('In required fields, return bad request', async () => {
    const newBlogEntrance2 =
    {
      author: 'Dan Abramov',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Abramov456.pdf'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(newBlogEntrance2)
      .expect(400)
  })

  test('Update succeeds with valid id', async () => {
    const response = await api.get('/api/blogs')
    const idToUdt = response.body[0].id
    assert(idToUdt)
    await api.put(`/api/blogs/${idToUdt}`)
      .send({ likes: 9 })
      .expect(202)
  })
})

describe('deletion of a blog entrance', () => {
  const user = "69814eca7abe960cbf41e292"
  const setDBDel = async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(iniBlogList[0])
    blogObject.user = user
    await blogObject.save()
    blogObject = new Blog(iniBlogList[1])
    blogObject.user = user
    await blogObject.save()
    blogObject = new Blog(iniBlogList[2])
    blogObject.user = user
    await blogObject.save()
  }
  test('Succeeds with status 204', async () => {
    await setDBDel()
    const response = await api.get('/api/blogs')
    const idToDel = response.body[0].id
    assert(idToDel)
    await api
      .delete(`/api/blogs/${idToDel}`)
      .set('Authorization', `Bearer ${TOKEN}`)
      .expect(204)
  })
  test('Fails is token is not present', async () => {
    await setDBDel()
    const response = await api.get('/api/blogs')
    const idToDel = response.body[0].id
    assert(idToDel)
    await api
      .delete(`/api/blogs/${idToDel}`)
      .expect(401)
  })
})

after(async () => {
  await mongoose.connection.close()
})
