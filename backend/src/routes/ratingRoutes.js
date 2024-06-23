const express = require('express');
const router = express.Router();
const controller = require('../controllers/ratingController.js');

router.post('/eval', controller.add_evaluation);

module.exports = router;
