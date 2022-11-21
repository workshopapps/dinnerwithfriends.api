const Joi = require('joi');
const validateUser = require('../validators/createUser');
const loginUser = require('../validators/loginUser');




describe('Testing validation', () => {
  // Testing the user validator
  it('checking the user validation', () => {
  // Create an instance 
  let testUser = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    password: Joi.string()   
  });

   if(testUser == loginUser) {
    expect(testUser).toMatch(loginUser);
   }

  })

  // Testing the login schema 
  it('checking login schema', () => {
    // Create an instance 
    let testLogin =  Joi.object({
      email: Joi.string(),
      password: Joi.string(),
    });
   if(testLogin == validateUser) {
    expect(testUser).toEqual(validateUser);
   }
    
  })
  
})