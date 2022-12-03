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
router.use(services.protect);

router.get('/', getAllInvites);
router.post('/', createInvite);
// router.patch('/:id', updateInvite);
router.delete('/:id', deleteInvite);
router.get('/event/:id', getDecodedEvent);
router.get('/event/:id', getEventInvites);

module.exports = router;
