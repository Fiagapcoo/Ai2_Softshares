const express = require('express');
const router = express.Router();
const static_contentController = require('../controllers/Static_contentController.js');

router.post('/create-category', static_contentController.create_category);

module.exports = router;
