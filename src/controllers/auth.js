const {User} = require("./../models");
const bcrypt = require("bcrypt");
const {createUserSchema, userSchema} = require("../validators");
const asyncHandler = require("express-async-handler");
const services = require("../services");
const queryString = require('node:querystring');
const axios = require('axios');

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
  
    const user = await new User(userData).save();
    const message = 'Account created successfully';
    return services.createSendToken(user, 'success', message, res);
  });

//  Signin Controller 
const signin = asyncHandler( async( req, res, next) => {
  const {email, password} = req.body
  const validateUserInput = userSchema.validate({ email, password });
  if (validateUserInput.error) {
    let message = '';
    if (validateUserInput.error.details[0].path[0] === 'email') message = 'Email has to start with a letter, can contain numbers and underscores, must be at least 3 characters, must have @com or @net. No spaces and no other special characters allowed';
    if (validateUserInput.error.details[0].path[0] === 'password') message = 'Password has to start with a letter, can contain numbers, must be at least 8 characters, and no more than 30 characters. No spaces and special characters allowed';
    return services.createSendToken({}, 'error', message, res);
  }
  const userExists = await User.findOne({ email });
  if (!userExists) {
    const message = 'Email or password incorrect';
    return services.createSendToken({}, 'error', message, res);
  }
  const result = await bcrypt.compare( password, userExists.password);
  if(!result){
    const message = 'Email or password incorrect';
    return services.createSendToken({}, 'error', message, res);
  }
  const message = 'Signed in successfully';
  return services.createSendToken(userExists, 'success', message, res);
});

//  Get Google login URL
const getGAuthURL = asyncHandler( async( req, res, next) => {
  function getGoogleAuthURL() {
    const rootURL = 'https://accounts.google.com/o/oauth2/auth'
    const options = {
      redirect_uri:`${process.env.SERVER_ROOT_URI}`,
      client_id: `${process.env.GOOGLE_CLIENT_ID}`,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/calendar'
      ]
      .join(' ')
    }
    return(`${rootURL}?${queryString.stringify(options)}`)
  }
  return res.send(getGoogleAuthURL())
})
//  Get User from Google
const googleUserX = asyncHandler( async( req, res, next) => {
  const url = "https://oauth2.googleapis.com/token";
  const code = req.query.code
  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.SERVER_ROOT_URI,
    grant_type: "authorization_code",
  }
  axios.post( url, queryString.stringify(values),{
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  })
  .then( async(resD) => {
    const { id_token, access_token } = resD.data
    // Fetch the user's profile with the access token and bearer
    await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    )
    .then(async (resK) => {
      const name = resK.data.name,
      email = resK.data.email,
      verifiedEmail = resK.data.verified_email,
      refreshToken = access_token
      userData = {
        name,
        email,
        verifiedEmail,
        refreshToken
      };
      try {
        await new User(userData).save()
        let message = "success"
        return services.googleSendToken(access_token, 'success', message, res);
      } catch (error) {
        let message = "registered"
        return services.googleSendToken(access_token, 'registered', message, res);
      }
    })
    .catch((error) => {
      console.error(`Failed to fetch user`);
      throw new Error(error.message);
    });
  })
  .catch((error) => {
    console.error(`Failed to fetch auth tokens`);
    throw new Error(error.message);
  });
  
})

//Get current user

module.exports = {
  signup,
  signin,
  getGAuthURL,
  googleUserX
}