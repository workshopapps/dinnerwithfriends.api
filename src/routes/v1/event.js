const express = require('express');
const { eventControllers } = require('../../controllers');
const services = require('../../services');

const router = express.Router();
router.use(services.protect);

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
  .get(eventControllers.getSingleEventByToken);

router
.route('/participants/:id')
.get(eventControllers.getEventParticipants)

module.exports = router;
