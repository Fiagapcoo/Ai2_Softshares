const express = require('express');
const router = express.Router();

const permissionController = require('../controllers/PermissionsController');

router.post('/add', permissionController.add);
//router.post('/remove', permissionController.remove);
router.get('/list', permissionController.list);

module.exports = router;