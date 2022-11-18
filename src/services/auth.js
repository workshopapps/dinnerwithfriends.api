const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { User } = require('../models');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN,
});

const createSendToken = (data, status, message, res) => {
  let token = '';

  // remove password from output
  if (data && data.password) {
    token = signToken(data._id);
    data.password = null;
  }

  return res.json({
    status,
    token,
    message,
    data,
  });
};

const googleSendToken = (data, status, message, res) => {
  let token = '';

  // remove password from output
  if (data) {
    token = signToken(data);
    data.id = null;
  }

  return res.json({
    status,
    token,
    message,
    data,
  });
};

module.exports = {
    createSendToken,
    googleSendToken
}