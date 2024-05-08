const express = require('express');
const router = express.Router();

const RegionalOfficeController = require('../controllers/RegionalOffice_Controller');

router.get('/list', RegionalOfficeController.getAll);
router.get('/get/:id', RegionalOfficeController.get);
router.post('/add', RegionalOfficeController.create);
router.put('/update/:id', RegionalOfficeController.update);
router.delete('/delete/:id', RegionalOfficeController.delete);

module.exports = router;