const Sequelize = require('sequelize');
const SequelizeDB = require('./db');
const SubArea = require('./static_content.sub_area');
const Office = require('./centers.office_workers');
const User = require('./hr_users');
const Forums = SequelizeDB.define('static_content.forums', {
  FORUM_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  PUBLISHER_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'PUBLISHER_ID'
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
  SUB_AREA_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: SubArea,
      key: 'SUB_AREA_ID'
    }
  },
  CREATION_DATE : {
    type: Sequelize.DATE,
    allowNull: false
  },

  TITLE: {
    type: Sequelize.STRING(255),
    allowNull: false
  },


}, {
  timestamps: false,
  freezeTableName: true
});

Forums.sync();

module.exports = Forums;


