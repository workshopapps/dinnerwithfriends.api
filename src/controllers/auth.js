const { User, AccountRecovery } = require('./../models');
const { createUserSchema, loginUserSchema } = require('../validators');
const asyncHandler = require('express-async-handler');
const services = require('../services');
const { AppError } = require('../utilities');
const bcrypt = require('bcrypt');
const { generateJWTToken } = require('../services/auth');
const jwt = require('jsonwebtoken');
const random = require('lodash/random');
const moment = require('moment');
const sendAccountRecoveryToken = require('../services/Mail/sendAccountRecoveryToken');

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

  const userData = {
    name,
    email,
    password,
  };

  const user = await new User(userData).save();
  const message = 'Account created successfully';
  return res.json(message);
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

  const user = await User.findOne({ email: email });

  if (!user) {
    next(new AppError('This email is not registered', 422));
  }

  const isPasswordCorrect = await user.comparePassword(password, user.password);
  if (!isPasswordCorrect) {
    next(new AppError('Incorrect password', 422));
  }

  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = await generateJWTToken(payload, process.env.JWT_SECRET, '1d');

  const refreshToken = await generateJWTToken(
    payload,
    process.env.REFRESH_TOKEN_SECRET,
    '2d'
  );

  console.log(refreshToken);
  user.refreshToken = refreshToken;
  const result = await user.save();
  // // Creates Secure Cookie with refresh token
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
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
});

const handleRefreshToken = asyncHandler(async (req, res, next) => {
  const cookies = req.cookies;
  // console.log('hello');
  console.log(cookies);
  if (!cookies?.jwt) next(new AppError('No refresh token found', 401));

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  // console.log(foundUser);
  if (!foundUser) next(new AppError('No user found', 403));
  // evaluate jwt
  //    console.log(process.env.REFRESH_TOKEN_SECRET);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    // console.log(decoded);
    // console.log(foundUser);
    if (err || foundUser.email !== decoded.email)
      next(new AppError('user does not match', 403));
    const payload = {
      id: foundUser._id,
      email: foundUser.email,
    };
    const accessToken = jwt.sign({ ...payload }, process.env.JWT_SECRET, {
      expiresIn: '5h',
    });
    res.json({ accessToken });
  });
});

const generateRecoverAccountToken = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    email: email,
  });
  if (!user) {
    next(new AppError('account not found', 403));
  }

  const code = random(10000, 99999);
  const accountRecoveryTokenData = {
    userId: user._id,
    email: user.email,
    token: code.toString(),
    expiresAt: moment().add(30, 'minutes'),
  };

  const accountRecoveryToken = await new AccountRecovery(
    accountRecoveryTokenData
  ).save();
  await sendAccountRecoveryToken(accountRecoveryToken.token, email);
  // await MailService.sendAccountRecoveryToken({
  //   token: accountRecoveryToken.token,
  //   email,
  // });

  return res.send({
    status: 'success',
    message: 'account recovery token has been sent to your email',
    data: {
      account_recovery_token: accountRecoveryToken.token,
    },
  });
});

const recoverAccount = asyncHandler(async (req, res, next) => {
  let { token, password, email } = req.body;

  const recoveryToken = await AccountRecovery.findOne({
    email: email,
    token: token,
  });
  if (!recoveryToken) {
    next(new AppError('token is invalid', 400));
  }
  if (moment().isAfter(recoveryToken.expires_at)) {
    next(new AppError('token has expired', 400));
  }
  const user = await User.findById(recoveryToken.userId);
  user.password = password;
  await user.save();

  // remove recovery token
  await AccountRecovery.findByIdAndDelete(recoveryToken._id);

  return res.send({
    status: 'success',
    message: 'account recovered',
  });
});

module.exports = {
  signup,
  signin,
  handleRefreshToken,
  generateRecoverAccountToken,
  recoverAccount,
};
