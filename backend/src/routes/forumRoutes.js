const express = require('express');
const router = express.Router();
const controller = require('../controllers/ForumController.js');

router.post('/create', controller.create_forum);
router.post('/create-forum-event', controller.create_forum_for_event);
router.get('/state', controller.get_forum_state);
router.patch('/edit', controller.edit_forum); 
module.exports = router;