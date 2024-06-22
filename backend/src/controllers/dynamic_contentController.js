const { spCreateForum } = require('../database/logic_objects/forumProcedures');

const controllers = {};

controllers.create_forum = async (req, res) => {
    const { officeID, subAreaId, title, description, publisher_id } = req.query; 
    console.log(req.query);
    try {
        await spCreateForum(officeID, subAreaId, title, description, publisher_id);
        res.status(201).send('Forum created successfully.');
    } catch (error) {
        res.status(500).send('Error creating Forum: ' + error.message);
    }
};

module.exports = controllers;
