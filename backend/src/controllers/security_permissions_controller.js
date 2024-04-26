const Sequelize = require('sequelize');
const SequelizeDB = require('./db');

const permissions = SequelizeDB.define('security.permissions', {
  RoleID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  RoleName: Sequelize.STRING,
  RoleLevel: Sequelize.INTEGER
}, {
  timestamps: false,
  freezeTableName: true // Prevent Sequelize from pluralizing the table name
});


permissions.sync();

module.exports = permissions;