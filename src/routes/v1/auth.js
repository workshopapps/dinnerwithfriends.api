const express = require('express');
const { authControllers } = require('../../controllers');
const ensureAuthenticated = require('../../middlewares/auth');

const router = express.Router();

router.post('/signup', authControllers.signup);
router.post('/signin', authControllers.signin);
router.get('/protected', ensureAuthenticated, (req, res, next) => {
  res.send('hello');
});

module.exports = router;
