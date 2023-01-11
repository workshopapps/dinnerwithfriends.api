/* eslint-disable linebreak-style */
const express = require('express');
const { contactControllers } = require('../../controllers');

const router = express.Router();

router.post('/', contactControllers.sendEmail);

module.exports = router;
