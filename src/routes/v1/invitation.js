const express = require('express');
const {
  createInvite,
  updateInvite,
  deleteInvite,
} = require('../../controllers/invite');
const services = require('../../services');

const router = express.Router();
router.use(services.protect);

router.get('/', (req, res) => {
  res.send('hello there');
});

router.post('/', createInvite);
router.patch('/:id', updateInvite);
router.delete('/:id', deleteInvite);

module.exports = router;
