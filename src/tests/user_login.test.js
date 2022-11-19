const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.create({
    name: 'user1',
    email: 'user1@gmail.com',
    password: 'Password0!',
  })
})

describe('POST request to /api/v1/auth/signin', () => {
  test('is successful if user is registered in the database', async () => {
    const response = await api
      .post('/api/v1/auth/login')
      .send({
        username: 'user1',
        password: 'Password0!',
      })
      .expect(200)

    expect(response.body).toHaveProperty('token')
  })

  test('returns error if incorrect details are sent', async () => {
    const response = await api
      .post('/api/v1/auth/login')
      .send({
        username: 'user1',
      })
      .expect(403)

    expect(response.body).not.toHaveProperty('token')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
