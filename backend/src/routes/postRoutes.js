const express = require('express');
const router = express.Router();
const controller = require('../controllers/postController.js');

router.post('/create', controller.create_post);
router.get('/state', controller.get_post_state);
router.patch('/edit', controller.edit_post); 
module.exports = router;
