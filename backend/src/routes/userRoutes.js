const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController.js');

router.post('/add-bookmark', controller.add_bookmark);
router.get('/get-bookmarks', controller.get_user_bookmarks);
router.delete('/remove-bookmark', controller.remove_bookmark);
router.patch('/update-user-preferences', controller.update_user_preferences);
router.get('/get-user-preferences', controller.get_user_preferences);
router.get('/get-user-role', controller.get_user_role);
router.patch('/update-acess-on-login', controller.update_access_on_login); 




module.exports = router;








