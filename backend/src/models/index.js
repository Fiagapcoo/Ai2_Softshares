const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize({
    host: 'localhost',
    port: 5432, 
    dialect: 'postgres',
    username: 'adminpint',
    password: 'softshares',
    database: 'postgres',
    logging: console.log, // Enable logging to see SQL queries
})
/*
const sequelize = new Sequelize({
    // your database config here
    dialect: '',
    host: 'softshares-postgresql.postgres.database.azure.com',
    port: 5432,
    username: 'pintsoftshares',
    password: '--',
    database: 'postgres',
});
*/
const db = {};
const modelDir = path.join(__dirname);

// Function to recursively read model files
const readModels = (dir) => {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            readModels(fullPath);
        } else if (file.endsWith('.js') && file !== 'index.js') {
            const model = require(fullPath)(sequelize, DataTypes);
            db[model.name] = model;
            console.log(`Imported model: ${model.name}`);
        }
    });
};

// Read models from the models directory
readModels(modelDir);

// Associate models if needed
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
        console.log(`Associated model: ${modelName}`);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;