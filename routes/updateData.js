const express = require('express');
const controller = require('../controllers/updateData');
const router = express.Router();

router.patch('/entries/:id', controller.updateData);

module.exports = router;