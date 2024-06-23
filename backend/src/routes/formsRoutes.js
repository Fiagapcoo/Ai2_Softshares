const express = require('express');
const router = express.Router();
const controller = require('../controllers/formsController.js');

router.post('/create-form', controller.create_event_form);
router.post('/add-fields-to-form', controller.add_fields_event_form);
router.patch('/edit-form-fields', controller.edit_fields_event_form); 
router.get('/event-form', controller.get_event_form);
router.get('/event-json-form', controller.get_event_json_form);
router.post('/add-answer', controller.add_answer);
router.post('/add-answers', controller.add_answers);
router.delete('/delete-field', controller.delete_field_from_form);

module.exports = router;









