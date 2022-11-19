const express = require('express');
const { participantControllers } = require('../../controllers');

const router = express.Router();

router.post('/addpart', participantControllers.addParticipant);

module.exports = router;