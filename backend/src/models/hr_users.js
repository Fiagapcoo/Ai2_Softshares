const Sequelize = require('sequelize');
const SequelizeDB = require('./db');

const Users = SequelizeDB.define('hr.users', {
  USER_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  EMAIL: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  PASSWORD: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  PROFILE_PIC: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  RoleID: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  JOIN_DATE: {
    type: Sequelize.DATE,
    allowNull: false
  },
  NAME: {
    type: Sequelize.STRING(60),
    allowNull: false
  },
  LAST_ACCESS: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});

Users.sync();

module.exports = Users;