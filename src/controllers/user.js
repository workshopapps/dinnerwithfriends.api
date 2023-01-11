const expressAsyncHandler = require('express-async-handler');
const { User } = require('../models');
const { createSendData } = require('../services');
const { updatedUserSchema } = require('../validators');

// Return User Profile
const getProfile = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.id })
    .select('-password')

  if (!user) {
    const message = 'User does not exist!'
    return createSendData({}, 'error', message, res);
  }
  const message = 'Successfully fetched user';
  return createSendData(user, 'success', message, res);
});

// User Profile Controller
const profile = expressAsyncHandler(async (req, res, next) => {
  const { name, gender, mobile, birthday } = req.body;

  const validateUserInput = updatedUserSchema.validate({ name });

  if (validateUserInput.error) {
    let message = '';
    if (validateUserInput.error.details[0].path[0] === 'name') message = 'First name has to start with a letter, can contain spaces, must be at least 3 characters, and no more than 30 characters. No special characters allowed';
    return createSendData({}, 'error', message, res);
  }

  const userData = {
    name,
    gender,
    mobile,
    birthday
  };

  if (name) {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, userData, {
      new: true,
    }).select('-password');

    const message = 'User updated successfully';
    return createSendData(updatedUser, 'success', message, res);
  }
});

module.exports = {
  profile,
  getProfile
};
