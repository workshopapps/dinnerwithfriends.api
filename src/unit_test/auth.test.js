const auth = require('../controllers/auth');
const router = require('../routes/v1/auth');
const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../models/user');
const axios = require('axios');

beforeEach( async () => {await User.deleteMany()})
test('Should signup a new user', async (req, res, next) => {
const response = await request(app).post('/signup')
.send({
  name: 'test',
  email:"test@test.com",
  password:"1234567890",
})
.expect(200)
//Assert that the database was changed correctly
const user = await User.findOne({email})
expect(response.body).toMatchObject({
user:{
name: 'test',
email:"test@test.com"
},
token: user.tokens[0].token
})
expect(user.password).not.toBe('1234567890')
})