const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Define routes
router.post('/trigger-notifications', notificationController.triggerNotifications);
router.post('/notify-event-changes', notificationController.notifyEventChanges);
router.post('/notify-event-comments', notificationController.notifyEventComments);
router.post('/notify-event-creator', notificationController.notifyEventCreator);
router.post('/notify-event-interactions', notificationController.notifyEventInteractions);

module.exports = router;
