const express = require('express');
const {
  createInvite,
  updateInvite,
  deleteInvite,
  getAllInvites,
  getEventInvites,
  getDecodedEvent,
} = require('../../controllers/invite');
const services = require('../../services');

const router = express.Router();
// router.use(services.protect);

router.get('/', services.protect, getAllInvites);
router.post('/', services.protect, createInvite);
// router.patch('/:id', updateInvite);
router.delete('/:id', services.protect, deleteInvite);
router.get('/event/:id', getDecodedEvent);
router.get('/event/invites/:id', services.protect, getEventInvites);

module.exports = router;
