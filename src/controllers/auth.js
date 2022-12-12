const { User, AccountRecovery } = require('./../models');
const {
  createUserSchema,
  loginUserSchema,
  recoverPasswordSchema,
} = require('../validators');
const asyncHandler = require('express-async-handler');
const services = require('../services');
const { AppError } = require('../utilities');
const { signRefreshToken, generateJWTToken } = require('../services/auth');
const jwt = require('jsonwebtoken');
const random = require('lodash/random');
const moment = require('moment');
const sendAccountRecoveryToken = require('../services/Mail/nodemailer/sendAccountRecoveryToken');
const queryString = require('querystring');
const axios = require('axios');
const passport = require('passport');

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
        'Password has to start with a letter, can contain numbers, must be at least 9 characters, and no more than 30 characters. No spaces and special characters allowed';
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

const signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const validateUserInput = loginUserSchema.validate({
    email,
    password,
  });

  let message = '';
  if (validateUserInput.error) {
    if (validateUserInput.error.details[0].path[0] === 'email')
      message =
        'Email has to start with a letter, can contain numbers and underscores, must be at least 3 characters, must have @com or @net. No spaces and no other special characters allowed';
    if (validateUserInput.error.details[0].path[0] === 'password')
      message =
        'Password has to start with a letter, can contain numbers, must be at least 9 characters, and no more than 30 characters. No spaces and special characters allowed';
    return services.createSendToken({}, 'error', message, res);
  }

  const user = await User.findOne({ email: email });

  //1) if email and password exist
  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError('incorrect email or password', 401));
  }

  const payload = {
    id: user._id,
    email: user.email,
    name: user.name,
  };

  const accessToken = await generateJWTToken(
    payload,
    process.env.JWT_SECRET,
    '1d'
  );
  // Creates Secure Cookie with refresh token

  const accessCookieOptions = {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: false,
  };

  if (process.env.NODE_ENV === 'production') {
    accessCookieOptions.secure = false;
  }
  res.cookie('accessToken', accessToken, accessCookieOptions);

  message = 'Logged in successfully';
  user.password = null;
  user.refreshToken = null;
  const data = user;
  return res.json({
    status: 'success',
    message: message,
    accessToken: accessToken,
    data,
  });
  //  return services.createSendToken(user, 'success', message, res);
});

const handleRefreshToken = asyncHandler(async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies.jwt) next(new AppError('No refresh token found', 401));

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
    token: code && code.toString(),
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

  const validateUserInput = recoverPasswordSchema.validate({
    email,
    password,
    token,
  });

  let message = '';
  if (validateUserInput.error) {
    if (validateUserInput.error.details[0].path[0] === 'email')
      message =
        'Email has to start with a letter, can contain numbers and underscores, must be at least 3 characters, must have @com or @net. No spaces and no other special characters allowed';
    if (validateUserInput.error.details[0].path[0] === 'password')
      message =
        'Password has to start with a letter, can contain numbers, must be at least 9 characters, and no more than 30 characters. No spaces and special characters allowed';
    return services.createSendToken({}, 'error', message, res);
  }
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

const getDecodedUser = asyncHandler(async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies.accessToken) next(new AppError('No token found', 401));

  const token = cookies.accessToken;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return res.json({
    status: 'success',
    message: 'User fetched successfully',
    data: {
      user: decoded,
    },
  });
});

const googleAuth = passport.authenticate('google', {
  scope: ['email', 'profile'],
});

const googleAuthCallback = passport.authenticate('google', {
  successRedirect: '/api/v1/auth/google/redirect',
  failureRedirect: '/auth/google/failure',
});

const googleAuthRedirect = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  const { id, name, email } = req.user;
  const payload = {
    id,
    name,
    email,
  };
  const accessToken = await generateJWTToken(
    payload,
    process.env.JWT_SECRET,
    '30d'
  );
  const refreshToken = await generateJWTToken(
    payload,
    process.env.REFRESH_TOKEN_SECRET,
    '60d'
  );
  res.cookie('accessToken', accessToken, {
    httpOnly: false,
    // sameSite: 'none',
    domain:"catchup.hng.tech",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: false,
    // sameSite: 'none',
    domain:"catchup.hng.tech",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.redirect(process.env.UI_ROOT_URI);
});

module.exports = {
  signup,
  signin,
  handleRefreshToken,
  generateRecoverAccountToken,
  recoverAccount,
  getDecodedUser,
  googleAuthCallback,
  googleAuth,
  googleAuthRedirect,
};
