const Sequelize = require('sequelize');
const SequelizeDB = require('./db');

const Users = SequelizeDB.define('users', {
  USER_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true, // Auto-increment enabled
  },
  EMAIL: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  PASSWORD: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  PROFILE_PIC: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  RoleID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  JOIN_DATE: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  NAME: {
    type: Sequelize.STRING(60),
    allowNull: false,
  },
  LAST_ACCESS: {
    type: Sequelize.DATE,
    allowNull: false,
  },
}, {
  timestamps: false,
  freezeTableName: true,
  schema: 'hr', // Ensure schema is specified
});

// Sync the model to create or update the table in the 'hr' schema
Users.sync({ alter: true }); // Ensure table is synced with auto-increment

module.exports = Users;
