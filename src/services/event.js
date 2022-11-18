const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { Event } = require('../models');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN,
});

const newEventToken = (data, status, message, res) => {
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

const protectEvent = asyncHandler(async (req, res, next) => {
  // get token and check if it is there
  let token;

  if (
    req.headers.authorization
    && req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.json({ message: 'You are not logged in! Please login to get access' });
  }

  // validate signToken or verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  /* check if user still exist (important! especially if the user has been deleted after jwt has been issued) */
  const currentEvent = await Event.findById(decoded.id);
  if (!currentEvent) {
    return res.json({ message: 'The event no longer exists' });
  }

  // Grant access to protected route
  req.user = currentUser;
  next();
});

module.exports = {
    protectEvent,
    newEventToken
}