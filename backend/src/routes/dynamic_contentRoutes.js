const express = require('express');
const router = express.Router();
const dynamicController = require('../controllers/dynamic_contentController.js');

router.post('/create-forum', dynamicController.create_forum);

module.exports = router;
