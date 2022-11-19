const express = require('express');
const { participantControllers } = require('../../controllers');

const router = express.Router();

router.post('/addpart', participantControllers.addParticipant);

//delete user
router.delete('/removepart', participantControllers.deleteParticipant);

//update participant
router.put('/updatepart', participantControllers.updateParticipant);


module.exports = router;