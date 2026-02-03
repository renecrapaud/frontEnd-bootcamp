const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const iniUsrList = [
  {
    "username": "JhonDoe",
    "name": "Jhon Doe",
    "passWdHash": "mynewpass123"
  },
  {
    "username": "loremipsum",
    "name": "lorem ipsum",
    "passWdHash": "yoururl.com"
  },
  {
    "username": "somemario",
    "name": "some super mario",
    "passWdHash": "thatoldpass123"
  }
]

beforeEach(async () => {
  await User.deleteMany({})
  let usrObj = new User(iniUsrList[2])
  await usrObj.save()
  usrObj = new User(iniUsrList[1])
  await usrObj.save()
  usrObj = new User(iniUsrList[0])
  await usrObj.save()
})

describe('testing to get users in DB', () => {
  test('User data is returned as JSON', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length, iniUsrList.length)
  })
})

describe('testing to add users', () => {
  test('Fails with status 400 for duplicated username', async () => {
    const newUsrReq = [{
      "username": "somemario",
      "name": "some super mario",
      "password": "thatoldpass123"
    }]
    const newUsrSend = new User(newUsrReq[0])
    await api.post('/api/users')
      .send(newUsrSend)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/users/')
    assert.strictEqual(response.body.length, iniUsrList.length)
  })

  test('Fails with status 400 for bad username length', async () => {
    const badUsrReq = {
      "username": "ne",
      "name": "a user for test",
      "password": "thatoldpass123"
    }
    await api.post('/api/users')
      .send(badUsrReq)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/users')
    assert.strictEqual(response.body.length, iniUsrList.length)
  })

  test('Succeds with status 201 for valid user', async () => {
    const newUsrReq = {
      "username": "newUsrTest",
      "name": "a user for test",
      "password": "thatoldpass123"
    }
    await api.post('/api/users')
      .send(newUsrReq)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/users')
    assert.strictEqual(response.body.length, iniUsrList.length + 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})
