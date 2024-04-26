const Sequelize = require('sequelize');
const SequelizeDB = require('./db');

const Area = SequelizeDB.define('static_content.area', {
  AREA_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  TITLE: {
    type: Sequelize.STRING(255),
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Area;