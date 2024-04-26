const Sequelize = require('sequelize');

const db = new Sequelize('softshares','postgres', 'postgres', {
    host: 'localhost',
    port: 5432, 
    dialect: 'postgres'
})

db.sync()

module.exports = db;