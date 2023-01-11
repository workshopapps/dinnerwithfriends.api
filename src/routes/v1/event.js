const express = require('express');
const { eventControllers } = require('../../controllers');
const services = require('../../services');

const router = express.Router();

router.route('/token/:id').get(eventControllers.getSingleEventByToken);

// router.use(services.protect);
router
  .route('/')
  .get(services.protect, eventControllers.getAllEvents)
  .post(services.protect, eventControllers.addEvent);

router
  .route('/:id')
  .get(eventControllers.getSingleEvent)
  .delete(services.protect, eventControllers.deleteEvent)
  .patch(services.protect, eventControllers.updateEvent);

router
  .route('/cancel/:id')
  .patch(services.protect, eventControllers.cancelEvent);

router
  .route('/participants/:id')
  .get(services.protect, eventControllers.getEventParticipants);

router
  .route('/user/event')
  .get(services.jwt.protect, eventControllers.getUserEvent);

// router
// .route('/user/:id')
// .get(eventControllers.getAllEventsByUser)

module.exports = router;
