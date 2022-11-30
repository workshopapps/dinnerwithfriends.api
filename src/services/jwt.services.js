/* eslint-disable linebreak-style */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const {User} = require('../models');

const jwtSecretKey = process.env.JWT_SECRET;
const signToken = (payload) => {
  try {
    const token = jwt.sign(payload, jwtSecretKey, { expiresIn: '4h' });
    return token;
  } catch (error) {
    return false;
  }
};
const decodeToken = (token) => {
  try {
    console.log(token)
    const decodedToken = jwt.verify(token, jwtSecretKey);
    return decodedToken;
  } catch (error) {
    return false;
  }
};
const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : null;
    if (token == null) {
      return res.status(400).json({ message: 'No Token Provided!' });
    }
    // decode the token
    const decoded = decodeToken(token);
    console.log(decoded)
    // check if the user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        error: 'User Not Found',
      });
    }
    console.log(`${user.name} is successfully authenticated`);
    // add the user to the request
    req.user = user;
    // call the next middleware
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'authentication error',
      msg: 'sign in to continue',
    });
  }
};
module.exports = {
  signToken,
  decodeToken,
  protect,
};
