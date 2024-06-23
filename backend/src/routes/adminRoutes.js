const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController.js');

router.patch('/validate-content', controller.validate_content);
router.patch('/reject-content', controller.reject_content);


module.exports = router;