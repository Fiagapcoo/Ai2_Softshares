const Sequelize = require('sequelize');
const SequelizeDB = require('./db');

const Role = require('./security_permissions')

const Users = SequelizeDB.define('users', {
  USER_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
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
  ROLEID: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Role,
      key: 'RoleID',
    },
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
    allowNull: true,
  },
}, {
  timestamps: false,
  freezeTableName: true,
  schema: 'hr', 
});

Users.sync({ alter: true });

Users.belongsTo(Role, { foreignKey: 'ROLEID' });

module.exports = Users;
