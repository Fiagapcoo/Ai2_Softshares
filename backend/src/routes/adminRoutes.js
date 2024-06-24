const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController.js');

router.patch('/validate-content/:contentType/:contentID/:adminID', controller.validate_content);
router.patch('/reject-content/:contentType/:contentID/:adminID', controller.reject_content);


module.exports = router;