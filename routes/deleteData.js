const express = require('express');
const controller = require('../controllers/deleteData');
const router = express.Router();

router.delete('/entries/:id', controller.deleteData);

module.exports = router;