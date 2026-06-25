const express = require('express');
const router = express.Router();
const supportController = require('./support.controller');

router.post('/contact', supportController.submitContactForm);

module.exports = router;
