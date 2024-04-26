const Sequelize = require('sequelize');
const SequelizeDB = require('./db');

const DefaultFields = SequelizeDB.define('forms.default_fields', {
  FIELD_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  FIELD_NAME: {
    type: Sequelize.STRING(60),
    allowNull: false
  },
  FIELD_TYPE: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  FIELD_VALUE: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  MAX_VALUE: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  MIN_VALUE: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
}, {
  timestamps: false,
  freezeTableName: true
});
DefaultFields.sync();    "success": true,
"message": "User registered",
"data": {
    "name": "SequelizeValidationError",
    "errors": [
module.exports = DefaultFields;