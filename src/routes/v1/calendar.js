const express = require('express');
const { calendarControllers } = require('../../controllers');
const services = require('../../services')

const router = express.Router();

router.get('/auth', calendarControllers.getRefreshToken)

router
    .route('/')
    .get(calendarControllers.sendUserToAuthenticate)
    .post(calendarControllers.saveCalendarWithUrl)

router
    .route('/save/:id')
    .get(calendarControllers.saveEvent)

module.exports = router;
