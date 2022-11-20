const { object } = require('joi');
const Joi = require('joi');
const validateUser = require('../validators/createUser');
const loginUser = require('../validators/loginUser');



describe('Testing validation', () => {
  // Testing the user validator
  it('checking the user validation', () => {
   const testUser = Joi.object({
      name: 'hng',
      email: 'hng',
      password: 'hng'
  });
  expect(testUser).toEqual(validateUser);

  })

  // Testing the login schema 
  it('checking login schema', () => {
    const testLogin = Joi.object({
      email: 'string',
      password: 'string'
    })
    expect(testLogin).toMatch(expect.objectContaining(loginUser));
  })

  
})