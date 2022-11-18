const { User } = require('./../models');
const { createUserSchema, loginUserSchema } = require('../validators');
const asyncHandler = require('express-async-handler');
const services = require('../services');
const { AppError } = require('../utilities');
const bcrypt = require('bcryptjs');
const { generateJWTToken } = require('../services/auth');

// Signup Controller
const signup = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const validateUserInput = createUserSchema.validate({
    name,
    email,
    password,
  });

  if (validateUserInput.error) {
    let message = '';
    if (validateUserInput.error.details[0].path[0] === 'name')
      message =
        'Name has to start with a letter, can contain spaces, must be at least 3 characters, and no more than 30 characters. No special characters allowed';
    if (validateUserInput.error.details[0].path[0] === 'email')
      message =
        'Email has to start with a letter, can contain numbers and underscores, must be at least 3 characters, must have @com or @net. No spaces and no other special characters allowed';
    if (validateUserInput.error.details[0].path[0] === 'password')
      message =
        'Password has to start with a letter, can contain numbers, must be at least 8 characters, and no more than 30 characters. No spaces and special characters allowed';
    return services.createSendToken({}, 'error', message, res);
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    const message = 'User exists';
    return services.createSendToken({}, 'error', message, res);
  }

  const newUser = User({
    name,
    email,
    password,
  });
  console.log(newUser);
  // res.send('hello')
  //Hash Passoword
  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      console.log(hash);
      newUser
        .save()
        .then((user) => {
          res.json({ status: 'success', data: newUser });
        })

        .catch((err) => {
          console.log(err);
          throw new AppError(err);
        });
    })
  );
  // return services.createSendToken(user, 'success', message, res);
});

const signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const validateUserInput = createUserSchema.validate({
    email,
    password,
  });

  if (validateUserInput.error) {
    let message = '';
    if (validateUserInput.error.details[0].path[0] === 'email')
      message =
        'Email has to start with a letter, can contain numbers and underscores, must be at least 3 characters, must have @com or @net. No spaces and no other special characters allowed';
    if (validateUserInput.error.details[0].path[0] === 'password')
      message =
        'Password has to start with a letter, can contain numbers, must be at least 8 characters, and no more than 30 characters. No spaces and special characters allowed';
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new AppError('This email is not registered', 422);
    }

    const match = await bcrypt.compare(password, user.password);


    if (match === false) {
      throw new AppError('Incorrect password', 422);
    }

    const payload = {
      id: user.id,
      email: user.email,
    };
    console.log('hello');

    const token = await generateJWTToken(payload, process.env.JWT_SECRET, '1d');
    console.log('hello');
    const refreshToken = await generateJWTToken(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      '2d'
    );

    console.log(token, refreshToken);
    user.refreshToken = refreshToken;
    const result = await user.save();

    // // Creates Secure Cookie with refresh token
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      // secure: true,
      // sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).send({
      success: true,
      message: 'Logged in successfully',
      user: {
        name: user.name,
        id: user._id,
        email: user.email,
      },
      accessToken: token,
    });

  } catch (error) {
    throw error;
  }
});

module.exports = {
  signup,
  signin,
};
