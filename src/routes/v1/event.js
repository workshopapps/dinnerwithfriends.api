const express = require('express');
const { eventControllers } = require('../../controllers');

const router = express.Router();

router.get('/', eventControllers.getAllEvents);
// router.post('/add', eventControllers.addEvent);
// router.get('/single/:event_id', eventControllers.getSingleEvent);
// router.delete('/delete/:event_id', eventControllers.deleteEvent);
// router.patch('/update/:event_id', eventControllers.updateEvent);

module.exports = router;
 