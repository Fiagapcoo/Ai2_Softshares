const Sequelize = require('sequelize');
const SequelizeDB = require('./db');
const RegionalOffice = require('./regional_office.model');
const Users = require('hr_users');

const OfficeWorkers = SequelizeDB.define('centers.office_workers', {
  OFFICE_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: RegionalOffice,
      key: 'OFFICE_ID'
    }
  },
  USER_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Users,
      key: 'USER_ID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

OfficeWorkers.sync();

module.exports = OfficeWorkers;