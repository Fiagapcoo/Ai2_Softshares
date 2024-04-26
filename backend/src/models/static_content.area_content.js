const Sequelize = require('sequelize');
const SequelizeDB = require('./db');
const language = require('./static_content.language');

const Area_Content = SequelizeDB.define('static_content.area_content', {
  AREA_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },

  LANGUAGE_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: language,
      key: 'LANGUAGE_ID'
    }
  },
  TRANSLATED_TITLE: {
    type: Sequelize.STRING(255),
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false,
  freezeTableName: true
});

Area_Content.sync();

module.exports = Area_Content;