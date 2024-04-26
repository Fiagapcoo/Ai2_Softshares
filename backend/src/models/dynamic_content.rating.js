const Sequelize = require('sequelize');
const SequelizeDB = require('./db');
const Users = require('./hr_users');
const Posts = require('./dynamic_content.posts');
const Events = require('./dynamic_content.events');

const Rating = SequelizeDB.define('dynamic_content.rating', {
  RATING_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  EVENT_ID: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Events,
      key: 'EVENT_ID'
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
  CRITIC_ID: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Users,
      key: 'USER_ID'
    }
  },
  EVALUATION_DATE: {
    type: Sequelize.DATE,
    allowNull: false
  },
  EVALUATION: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true,
});
Rating.sync();
module.exports = Rating;
