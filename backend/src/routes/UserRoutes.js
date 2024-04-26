const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController.js');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/list', userController.list);

module.exports = router;