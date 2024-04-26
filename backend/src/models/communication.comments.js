const Sequelize = require('sequelize');
const SequelizeDB = require('./db');
const Users = require('./hr_users');
const Posts = require('./dynamic_content.posts');
const Forums = require('./dynamic_content.forums');

const Comments = SequelizeDB.define('communication.comments', {
  COMMENT_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  FORUM_ID: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Forums,
      key: 'FORUM_ID'
    }
  },
  POST_ID: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Posts,
      key: 'POST_ID'
    }
  },
  PUBLISHER_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'USER_ID'
    }
  },
  COMMENT_DATE: {
    type: Sequelize.DATE,
    allowNull: false
  },
  CONTENT: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true,
  validate: {
    atLeastOneNotNull: function() {
      const forumIdExists = this.FORUM_ID !== null;
      const postIdExists = this.POST_ID !== null;
      if (!forumIdExists && !postIdExists) {
        throw new Error('Either FORUM_ID or POST_ID must be provided');
      }
    }
  }
});

module.exports = Comments;