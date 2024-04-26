const Sequelize = require('sequelize');
const SequelizeDB = require('./db');
const Events = require('./dynamic_content.events');
const DefaultFields = require('./forms.default_fields');

const Fields = SequelizeDB.define('forms.fields', {
  EVENT_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Events,
      key: 'EVENT_ID'
    }
  },
  FIELD_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  DEF_FIELD_ID: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: DefaultFields,
      key: 'FIELD_ID'
    }
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

module.exports = Fields;