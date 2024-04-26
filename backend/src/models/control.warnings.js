const Sequelize  = require('sequelize');
const SequelizeDB = require('./db');
const Users = require('./hr_users');
const RegionalOffice = require('./centers.regional_office');

const Warnings = SequelizeDB.define('control.warnings', {
  WARNING_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  WARNING_LEVEL: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  DESCRIPTION: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  STATE: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  CREATION_DATE: {
    type: Sequelize.DATE,
    allowNull: false
  },
  ADMIN_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'USER_ID'
    }
  },
  OFFICE_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: RegionalOffice,
      key: 'OFFICE_ID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Warnings;
