const UserModel = require('../models/hr_users');
const sequelize = require('../models/db');
const controllers = {};

sequelize.sync();

controllers.login = async (req, res) => {
    const { USER_EMAIL, USER_PASSWORD } = req.body;
    const data = await UserModel.findOne({
        where: { EMAIL: USER_EMAIL, PASSWORD: USER_PASSWORD }
    });
    if (data) {
        res.json({ success: true, message: 'User found', data: data });
    } else {
        res.json({ success: false, message: 'User not found' });
    }

};

controllers.list = async (req, res) => {
    const data = await UserModel.findAll();
    res.json(data);
}

controllers.register = async (req, res) => {
    const {email, password, profile_pic, roleid, join_date, name, last_access} = req.body;

    console.log(email, password, profile_pic, roleid, join_date, name, last_access);

    const data = await UserModel.create({
        EMAIL: email,
        PASSWORD: password,
        PROFILE_PIC: profile_pic,
        RoleID: roleid,
        JOIN_DATE: join_date,
        NAME: name,
        LAST_ACCESS: last_access
    })
    .then(function(data) {
        return data
    })
    .catch(error => {
        return error;
    });

    res.status(200).json({
        success: true,
        message: 'User registered',
        data: data
    });


}


module.exports = controllers;