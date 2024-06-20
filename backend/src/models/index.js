const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize({
    // your database config here
    dialect: 'postgres',
    host: 'softshares-postgresql.postgres.database.azure.com',
    port: 5432,
    username: 'pintsoftshares',
    password: '--',
    database: 'postgres',
});

const db = {};

// Read all model files and import them into Sequelize
fs.readdirSync(__dirname)
    .filter(file => file !== 'index.js' && file.endsWith('.js'))
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes);
        db[model.name] = model;
    });

// Associate models if needed
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
