const express = require('express');
const { authControllers } = require('../../controllers');
const ensureAuthenticated = require('../../middlewares/auth');
const loginLimiter = require('../../middlewares/loginLimiter');

const router = express.Router();

router.post('/signup', authControllers.signup);
router.post('/signin', loginLimiter, authControllers.signin);
router.get('/refresh', authControllers.handleRefreshToken);
router.post('/recover/generate', authControllers.generateRecoverAccountToken);
router.post('/recover/confirm', authControllers.recoverAccount);


//passport google auth
router.get('/google/auth', authControllers.googleAuth);
router.get('/google/callback', authControllers.googleAuthCallback);
router.get('/google/redirect', authControllers.googleAuthRedirect);


router.get('/user', authControllers.getDecodedUser);
// router.get('/protected', ensureAuthenticated, (req, res, next) => {
//   res.send('hello');
// });

module.exports = router;
