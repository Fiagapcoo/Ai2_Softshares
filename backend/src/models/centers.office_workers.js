const Sequelize = require('sequelize');
const SequelizeDB = require('./db');
const RegionalOffice = require('./centers.regional_office');
const Users = require('./hr_users');

const OfficeWorkers = SequelizeDB.define('office_workers', {
  OFFICE_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: RegionalOffice,
      key: 'OFFICE_ID'
    }
  },
  USER_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Users,
      key: 'USER_ID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true,
  schema: 'centers'
});

OfficeWorkers.sync( { alter: true });

OfficeWorkers.belongsTo(RegionalOffice, { foreignKey: 'OFFICE_ID' });
OfficeWorkers.belongsTo(Users, { foreignKey: 'USER_ID' });

module.exports = OfficeWorkers;