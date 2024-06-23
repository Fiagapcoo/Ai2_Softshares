const express = require('express');
const router = express.Router();
const controller = require('../controllers/commentsController.js');

router.post('/add-comment', controller.add_comment);
router.get('/get-comment-tree', controller.get_comments_tree);

module.exports = router;
