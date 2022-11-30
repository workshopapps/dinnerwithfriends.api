const express = require('express');
const { calendarControllers } = require('../../controllers');
const services = require('../../services')

const router = express.Router();
// router.use(services.protect)

router
  .route('/')
  .get(calendarControllers.getCalendar)
  .post(calendarControllers.insertCalendar)
  .delete(calendarControllers.deleteCalendar);

module.exports = router;
