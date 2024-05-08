const Sequelize = require('sequelize');
const SequelizeDB = require('./db');
const Users = require('./hr_users');

const RegionalOffice = SequelizeDB.define('regional_office', {
  OFFICE_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  MANAGER_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'USER_ID'
    }
  },
  CITY: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false,
  freezeTableName: true,
  schema: 'centers'
});

RegionalOffice.sync({ alter: true });

RegionalOffice.belongsTo(Users, { foreignKey: 'MANAGER_ID' });

module.exports = RegionalOffice;