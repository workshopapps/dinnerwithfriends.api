/* eslint-disable linebreak-style */
const express = require('express');
const { participantControllers } = require('../../controllers');
const services = require('../../services');

const router = express.Router();

// router.use(services.protect);

router.post('/addpart', participantControllers.addParticipant);

// delete user
router.delete('/delete', participantControllers.deleteParticipant);

// update participant
router.put('/updatepart', participantControllers.updateParticipant);

module.exports = router;
