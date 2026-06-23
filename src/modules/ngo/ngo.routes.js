const express = require('express');
const router = express.Router();
const NgoController = require('./ngo.controller');
const { requireAuth, requireRole } = require('../../middleware/auth');
// All NGO routes require authentication
router.use(requireAuth);

router.post('/upload-url', NgoController.getUploadUrl);
router.post('/upload-confirm', NgoController.confirmUpload);

router.use(requireRole(['ngo']));

router.post('/profile', NgoController.updateProfile);
router.get('/profile', NgoController.getProfile);
router.put('/profile', NgoController.updateProfile);
router.get('/dashboard', NgoController.getDashboard);

module.exports = router;
