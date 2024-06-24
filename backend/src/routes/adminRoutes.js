const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController.js');

router.patch('/validate-content/:contentType/:contentID/:adminID', controller.validate_content);
router.patch('/reject-content/:contentType/:contentID/:adminID', controller.reject_content);

router.get('/user-engagement-metrics', adminController.getUserEngagementMetrics);
router.get('/content-validation-status/admin/:adminID', adminController.getContentValidationStatusByadmin);
router.get('/content-validation-status', adminController.getContentValidationStatus);
router.get('/active-discussions', adminController.getActiveDiscussions);
router.get('/active-warnings', adminController.getActiveWarnings);
router.get('/content-center-to-be-validated/:center_id', adminController.getContentCenterToBeValidated);
router.post('/create-center', adminController.createCenter);
router.delete('/delete-center/:center_id', adminController.deleteCenter);

module.exports = router;