const express = require('express');
const controller = require('../controllers/createData');
const router = express.Router();

router.post('/entries', controller.createData);

module.exports = router;