const { spCreateCategory,spCreateSubArea } = require('../database/logic_objects/categoryProcedures');

const controllers = {};

controllers.create_category = async (req, res) => {
    const { title } = req.query; 
    try {
        await spCreateCategory(title);
        res.status(201).send('Category created successfully.');
    } catch (error) {
        res.status(500).send('Error creating category: ' + error.message);
    }
};

controllers.create_sub_category = async (req, res) => {
    const { areaId,title } = req.query; 
    try {
        await spCreateSubArea(areaId, title);
        res.status(201).send('Category created successfully.');
    } catch (error) {
        res.status(500).send('Error creating category: ' + error.message);
    }
};

module.exports = controllers;
