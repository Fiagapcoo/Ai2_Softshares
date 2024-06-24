const express = require('express');
const router = express.Router();
const dynamicController = require('../controllers/dynamic_contentController');

router.get('/posts-by-city', dynamicController.getPostsByCity);
router.get('/forums-by-city', dynamicController.getForumsByCity);
router.get('/events-by-city', dynamicController.getEventsByCity);
router.get('/all-content', dynamicController.getAllContent);
router.get('/get-post', dynamicController.getPostById);
router.get('/get-event', dynamicController.getEventById);
router.get('/get-forum', dynamicController.getForumById);
router.get('/user-info', dynamicController.getUserInfo);
//router.get('/user-preferences', dynamicController.getUserPreferences);

module.exports = router;