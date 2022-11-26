const express = require('express');
const { userControllers } = require('../../controllers');
const { protect } = require('../../services');

const router = express.Router();

router.patch('/profile', protect, userControllers.profile);

module.exports = router;
