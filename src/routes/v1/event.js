const express = require('express');
const { eventControllers } = require('../../controllers');
const services = require('../../services')

const router = express.Router();

router.route('/token/:id').get(eventControllers.getSingleEventByToken);

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

router.route('/cancel/:id').patch(eventControllers.cancelEvent);

router.route('/participants/:id').get(eventControllers.getEventParticipants);

router
  .route('/user/event')
  .get(services.jwt.protect, eventControllers.getUserEvent);


// router
// .route('/user/:id')
// .get(eventControllers.getAllEventsByUser)

module.exports = router;
