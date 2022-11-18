const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { User } = require('../models');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
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

async function generateJWTToken(payload, secret, expireDuration) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        ...payload,
      },
      secret,
      { expiresIn: expireDuration },
      (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
}



module.exports = {
  createSendToken,
  generateJWTToken,
};
