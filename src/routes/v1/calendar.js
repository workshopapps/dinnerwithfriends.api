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

router
    .route('/save/:id')
    .get(calendarControllers.saveEvent)

module.exports = router;
