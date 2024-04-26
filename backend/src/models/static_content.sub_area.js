const Sequelize = require('sequelize');
const SequelizeDB = require('./db');
const Area = require('./static_content.area');

const SubArea = SequelizeDB.define('static_content.sub_area', {
  SUB_AREA_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  AREA_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Area,
      key: 'AREA_ID'
    }
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

module.exports = SubArea;
