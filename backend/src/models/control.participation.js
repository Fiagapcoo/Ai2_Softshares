const Sequelize = require('sequelize');
const SequelizeDB = require('./db');
const Users = require('./hr_users');
const Events = require('./dynamic_content.events');

const Participation = SequelizeDB.define('control.participation', {
  USER_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Users,
      key: 'USER_ID'
    }
  },
  EVENT_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Events,
      key: 'EVENT_ID'
    }
  },
  ENTRY_DATE: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Participation;