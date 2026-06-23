const express = require('express');
const router = express.Router();
const EmailController = require('./email.controller');

// ─── Development Email Previews ──────────────────────────────────────────────
router.get('/preview/:template', EmailController.previewTemplate);

module.exports = router;
