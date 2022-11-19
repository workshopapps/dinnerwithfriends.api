const express = require('express');
const { authControllers } = require('../../controllers');
const ensureAuthenticated = require('../../middlewares/auth');

const router = express.Router();

router.post('/signup', authControllers.signup);
router.post('/signin', authControllers.signin);
router.get('/refresh', authControllers.handleRefreshToken);
router.post('/recover/generate', authControllers.generateRecoverAccountToken);
router.post('/recover/confirm', authControllers.recoverAccount);
router.get('/google/url', authControllers.getGAuthURL);
router.get('/google', authControllers.googleUserX);
// router.get('/protected', ensureAuthenticated, (req, res, next) => {
//   res.send('hello');
// });

module.exports = router;
