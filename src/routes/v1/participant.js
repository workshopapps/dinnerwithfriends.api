const express = require('express');
const { participantControllers } = require('../../controllers');

const router = express.Router();

router.post('/create', participantControllers.addParticipant);

module.exports = router;