const express = require('express');
const { eventControllers } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(eventControllers.getAllEvents)
  .post(eventControllers.addEvent);

router
  .route('/:id')
  .get(eventControllers.getSingleEvent)
  .delete(eventControllers.deleteEvent)
  .patch(eventControllers.updateEvent);

router
  .route('/token/:id')
  .get(eventControllers.getSingleEventByToken)

module.exports = router;
