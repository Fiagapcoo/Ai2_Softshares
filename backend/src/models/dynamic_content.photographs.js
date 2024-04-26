const Sequelize = require('sequelize');
const SequelizeDB = require('./db');
const Albuns = require('./dynamic_content.albuns');
const Users = require('./hr_users');

const Photographs = SequelizeDB.define('dynamic_content.photographs', {
  PHOTO_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  ALBUM_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Albuns,
      key: 'ALBUM_ID'
    }
  },
  PUBLISHER_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'USER_ID'
    }
  },
  FILEPATH: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  UPLOAD_DATE: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});

Photographs.sync();

module.exports = Photographs;