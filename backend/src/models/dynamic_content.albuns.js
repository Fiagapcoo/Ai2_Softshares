const Sequelize = require('sequelize');
const SequelizeDB = require('./db');
const Events = require('./dynamic_content.events');
const Area = require('./static_content.area');

const Albuns = SequelizeDB.define('dynamic_content.albuns', {
  ALBUM_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  EVENT_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Events,
      key: 'EVENT_ID'
    }
  },
  AREA_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Area,
      key: 'AREA_ID'
    }
  },
  CREATION_DATE: {
    type: Sequelize.DATE,
    allowNull: false
  },
  TITLE: {
    type: Sequelize.STRING(255),
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Albuns;