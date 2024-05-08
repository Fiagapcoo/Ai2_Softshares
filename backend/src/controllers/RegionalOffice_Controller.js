const RegionalOfficeModel = require('../models/centers.regional_office');
const UserModel = require('../models/hr_users');
const sequelize = require('../models/db');
const controllers = {};

sequelize.sync();

controllers.getAll = async (req, res) => {
    const data = await RegionalOfficeModel.findAll( { include: UserModel });
    res.json({success: true, data: data});
    };

controllers.get = async (req, res) => {
    const { id } = req.params;
    const data = await RegionalOfficeModel.findOne({ where: { OFFICE_ID: id } });
    res.json({success: true, data: data});
    }

controllers.create = async (req, res ) => {
    const { MANAGER_ID, CITY } = req.body;
    const data = await RegionalOfficeModel.create({
        MANAGER_ID,
        CITY
    });
    res.status(201).json({
        success: true,
        message: 'Regional Office created successfully',
        data: data
    });
}

controllers.update = async (req, res) => {
    const { id } = req.params;
    const { MANAGER_ID, CITY } = req.body;
    const data = await RegionalOfficeModel.update({
        MANAGER_ID,
        CITY
    },{
        where: { OFFICE_ID: id }
    });
    res.json({success: true, message: 'Regional Office updated successfully'});
}

controllers.delete = async (req, res) => {
    const { id } = req.params;
    await RegionalOfficeModel.destroy({
        where: { OFFICE_ID: id }
    });
    res.json({success: true, message: 'Regional Office deleted successfully'});
}

module.exports = controllers;