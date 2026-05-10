const express = require('express');
const { userControllers } = require('../../controllers');
const { protect } = require('../../services');

const router = express.Router();
router.use(protect)

router
.route('/profile')
.get(userControllers.getProfile)
.patch(userControllers.profile);

module.exports = router;
