const express = require('express');
const asyncHandler = require('express-async-handler');

const router = express.Router();

router.use(
  '/',
  asyncHandler(async (req, res, next) => {
    if (req.originalUrl === '/') return res.status(200).json({ message: 'Welcome to Catch-Up API!' });
    res.status(200).json({
      message: `Can't find the ${req.method} method for ${req.originalUrl} on this server`,
    });
  }),
);

module.exports = router;
