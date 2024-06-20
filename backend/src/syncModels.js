const db = require('./models');

async function syncModels() {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');

        for (const modelName of Object.keys(db)) {
            if (modelName !== 'sequelize' && modelName !== 'Sequelize') {
                await db[modelName].sync({ alter: true });
                console.log(`Synced model: ${modelName}`);
            }
        }

        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to sync models:', error);
    } finally {
        await db.sequelize.close();
    }
}

syncModels();
