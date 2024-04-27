const Sequelize = require('sequelize');
const SequelizeDB = require('./db');

const permissions = SequelizeDB.define('permissions', {
  RoleID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  RoleName: Sequelize.STRING,
  RoleLevel: Sequelize.INTEGER
}, {
  timestamps: false,
  freezeTableName: true,
  schema: 'security' 
});


permissions.sync({ alter: true });

module.exports = permissions;