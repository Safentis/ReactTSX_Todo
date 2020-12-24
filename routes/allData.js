const express = require('express');
const controller = require('../controllers/allData');
const router = express.Router();

router.get('/entries', controller.allEntries);

module.exports = router;