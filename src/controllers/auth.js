const {User} = require("./../models");
const {createUserSchema} = require("../validators")
const asyncHandler = require("express-async-handler")
const services = require("../services")

// Signup Controller
const signup = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
  
    const validateUserInput = createUserSchema.validate({ name, email, password });
  
    if (validateUserInput.error) {
      let message = '';
      if (validateUserInput.error.details[0].path[0] === 'name') message = 'Name has to start with a letter, can contain spaces, must be at least 3 characters, and no more than 30 characters. No special characters allowed';
      if (validateUserInput.error.details[0].path[0] === 'email') message = 'Email has to start with a letter, can contain numbers and underscores, must be at least 3 characters, must have @com or @net. No spaces and no other special characters allowed';
      if (validateUserInput.error.details[0].path[0] === 'password') message = 'Password has to start with a letter, can contain numbers, must be at least 8 characters, and no more than 30 characters. No spaces and special characters allowed';
      return services.createSendToken({}, 'error', message, res);
    }
  
    const userExists = await User.findOne({ email });
    if (userExists) {
      const message = 'User exists';
      return services.createSendToken({}, 'error', message, res);
    }
  
    const userData = {
      name,
      email,
      password,
    };
  
    await new User(userData).save();
    const message = 'Account created successfully';
    return services.createSendToken({}, 'success', message, res);
  });

  

  module.exports = {
    signup
  }


