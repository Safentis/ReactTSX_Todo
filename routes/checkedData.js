const express = require('express');
const controller = require('../controllers/checkedData');
const router = express.Router();

router.get('/entries-checked', controller.checkedData);

module.exports = router;