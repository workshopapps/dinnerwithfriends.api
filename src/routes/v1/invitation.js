const express = require('express');
const { createInvite } = require('../../controllers/invite');
const services = require('../../services');

const router = express.Router();
router.use(services.protect);

router.get('/', (req, res) => {
  res.send('hello');
});

router.post('/', createInvite);

module.exports = router;
