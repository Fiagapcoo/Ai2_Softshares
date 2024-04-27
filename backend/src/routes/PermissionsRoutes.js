const express = require('express');
const router = express.Router();

const permissionController = require('../controllers/PermissionsController');


router.get('/list', permissionController.list);

module.exports = router;