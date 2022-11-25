const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { User } = require('../models');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const signRefreshToken = (payload) => {
  return jwt.sign({ ...payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (data, status, message, res) => {
  let accessToken = '';

  // remove password from output
  if (data && data.password) {
    accessToken = signToken(data._id);
    data.password = null;
    data.refreshToken = null;
  }else{
    accessToken = null
    data = null
  }
  return res.json({
    status,
    accessToken,
    message,
    data,
  });
};

// async function generateJWTToken(payload, secret, expireDuration) {
//   return new Promise((resolve, reject) => {
//     jwt.sign(
//       {
//         ...payload,
//       },
//       secret,
//       { expiresIn: expireDuration },
//       (err, token) => {
//         if (err) {
//           reject(err);
//         }
//         resolve(token);
//       }
//     );
//   });
// }

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

const protect = asyncHandler(async (req, res, next) => {
  // get token and check if it is there
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.json({
      message: 'You are not logged in! Please login to get access',
    });
  }

  // validate signToken or verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  /* check if user still exist (important! especially if the user has been deleted after jwt has been issued) */
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.json({
      message: 'The user that this token belongs to no longer exists',
    });
  }

  // Grant access to protected route
  req.user = currentUser;
  next();
});

module.exports = {
  createSendToken,
  protect,
  // generateJWTToken,
  signRefreshToken,
  googleSendToken,
};
