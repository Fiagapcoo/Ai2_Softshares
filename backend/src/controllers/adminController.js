const { spValidateContent,
        spRejectContent } = require('../database/logic_objects/generalHelpers');

const { getUserEngagementMetrics,
        getContentValidationStatusByadmin,
        getContentValidationStatus,
        getActiveDiscussions,
        validateContent,
        getActiveWarnings,
        getContentCenterToBeValidated,
        createCenter,
        deleteCenter } = require('../database/logic_objects/adminProcedures');

const controllers = {};

controllers.validate_content = async (req, res) => { 
    const { contentType, contentId, adminId } = req.query; 
    console.log(req.query);
    try {
        await spValidateContent(contentType, contentId, adminId);


        res.status(201).send('Content validated successfully.');
    } catch (error) {
        res.status(500).send('Error validating content: ' + error.message);
    }
};

controllers.reject_content = async (req, res) => { 
    const { contentType, contentId, adminId } = req.query; 
    console.log(req.query);
    try {
        await spRejectContent(contentType, contentId, adminId);


        res.status(201).send('Content rejected successfully.');
    } catch (error) {
        res.status(500).send('Error rejecting content: ' + error.message);
    }
};

module.exports = controllers;