const Sequelize = require('sequelize');
const SequelizeDB = require('./db');
const Users = require('./hr_users');
const Forums = require('./dynamic_content.forums');

const EventForumAccess = SequelizeDB.define('control.event_forum_access', {
  USER_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Users,
      key: 'USER_ID'
    }
  },
  FORUM_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Forums,
      key: 'FORUM_ID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = EventForumAccess;