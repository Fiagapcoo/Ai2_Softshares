const Sequelize = require('sequelize');
const SequelizeDB = require('./db');

const Language = SequelizeDB.define('static_content.language', {
    LANGUAGE_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  LANGUAGE_CODE: {
    type: Sequelize.CHAR(2),
    allowNull: false,
    unique: true
  },
  LANGUAGE_NAME: {
    type: Sequelize.STRING(30),
    allowNull: false,
    unique: true
  },
  FLAG_IMAGE:{
    type: Sequelize.BYTEA,
    allowNull: true
       
  }
}, {
  timestamps: false,
  freezeTableName: true
});

Language.sync();

module.exports = Language;
