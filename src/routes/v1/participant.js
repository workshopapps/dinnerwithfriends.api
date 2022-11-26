/* eslint-disable linebreak-style */
const express = require('express');
const { participantControllers } = require('../../controllers');
const { protect } = require('../../services');

const router = express.Router();

router.post('/addpart', participantControllers.addParticipant);

// delete user
router.delete('/delete/:id', participantControllers.deleteParticipant);

// update participant
router.post('/update/:id', participantControllers.updateParticipant);

module.exports = router;
