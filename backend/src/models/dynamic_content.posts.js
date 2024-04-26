const Sequelize = require('sequelize');
const SequelizeDB = require('./db');
const SubArea = require('./static_content.sub_area');

const User = require('./hr_users');
const Posts = SequelizeDB.define('static_content.sub_area', {
    POST_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  SUB_AREA_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: SubArea,
      key: 'SUB_AREA_ID'
    }
  },
  OFFICE_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: Office,
      key: 'OFFICE_ID'
    }
  },
  ADMIN_ID : {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: User,
      key: 'ADMIN_ID'
    }
  },
  PUBLISHER_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: User,
      key: 'PUBLISHER_ID'
    }
  },
  CREATION_DATE : {
    type: Sequelize.DATE,
    allowNull: false
  },

  VALIDATION : {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },

  TITLE: {
    type: Sequelize.STRING(255),
    allowNull: false
  },

  CONTENT: {
    type: Sequelize.STRING(255),
    allowNull: false
  },

  FILEPATH : {
    type: Sequelize.STRING(255),
    allowNull: true
  },

}, {
  timestamps: false,
  freezeTableName: true
});

Posts.sync();

module.exports = Posts;


