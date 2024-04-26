const  Sequelize = require('sequelize');
const SequelizeDB = require('./db');
const Users = require('./hr_users');
const Comments = require('./communication.comments');

const Reports = SequelizeDB.define('control.reports', {
  REPORT_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  REPORTER_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'USER_ID'
    }
  },
  COMMENT_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Comments,
      key: 'COMMENT_ID'
    }
  },
  OBSERVATION: {
    type: Sequelize.STRING(255),
    allowNull: true
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Reports;
