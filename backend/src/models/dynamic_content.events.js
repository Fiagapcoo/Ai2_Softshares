const Sequelize = require('sequelize');
const SequelizeDB = require('./db');
const RegionalOffice = require('./centers.regional_office');
const Users = require('./hr_users');
const SubArea = require('./static_content.sub_area');

const Events = SequelizeDB.define('dynamic_content.events', {
  EVENT_ID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  PUBLISHER_ID: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Users,
      key: 'USER_ID'
    }
  },
  OFFICE_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: RegionalOffice,
      key: 'OFFICE_ID'
    }
  },
  SUBAREA_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: SubArea,
      key: 'SUB_AREA_ID'
    }
  },
  ADMIN_ID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'USER_ID'
    }
  },
  NAME: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  DESCRIPTION: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  EVENT_DATE: {
    type: Sequelize.DATE,
    allowNull: false
  },
  FILEPATH: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  RECURRING: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  RECURRING_PATTERN: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  VALIDADO: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  }
}, {
  timestamps: false,
  freezeTableName: true
});
Events.sync();
module.exports = Events;