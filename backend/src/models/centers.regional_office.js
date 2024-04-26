const Sequelize = require('sequelize');
const SequelizeDB = require('./db');
const Users = require('hr_users'); // Import the Users model for the foreign key relationship

const RegionalOffice = SequelizeDB.define('centers.regional_office', {
  OFFICE_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  MANAGER_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Users, // Set the reference to the Users model
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
  freezeTableName: true
});

RegionalOffice.sync();

module.exports = RegionalOffice;