const Sequelize = require('sequelize');
const SequelizeDB = require('./db');
const language = require('./static_content.language');

const SubAreaContent = SequelizeDB.define('static_content.area', {
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

SubAreaContent.sync();

module.exports = SubAreaContent;