/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { Participant } = require('../models');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN,
});

const newParticipantToken = (data, status, message, res) => {
  let token = '';

  // remove password from output
  if (data) {
    token = signToken(data._id);
  }

  return res.json({
    status,
    token,
    message,
    data,
  });
};

const protectParticipant = (token) => {
  // validate signToken or verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Grant access to protected route
  return decoded.id;
};

module.exports = {
  protectParticipant,
  newParticipantToken,
};
