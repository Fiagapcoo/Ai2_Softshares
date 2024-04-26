const Sequelize = require('sequelize');
const SequelizeDB = require('./db');
const Users = require('./hr_users');
const Fields = require('./forms.fields');

const Answers = SequelizeDB.define('forms.answers', {
  ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  USER_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'USER_ID'
    }
  },
  EVENT_ID: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  FIELD_ID: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  ANSWER: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  ENTRY_DATE: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});

// Define the composite foreign key relationship with forms.fields
Answers.belongsTo(Fields, {
  foreignKey: {
    name: 'EVENT_ID',
    allowNull: false
  },
  constraints: true
});

Answers.belongsTo(Fields, {
  foreignKey: {
    name: 'FIELD_ID',
    allowNull: false
  },
  constraints: true
});

module.exports = Answers;