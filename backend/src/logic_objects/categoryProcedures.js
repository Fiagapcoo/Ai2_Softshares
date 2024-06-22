const { QueryTypes } = require('sequelize');
const sequelize = require('../models/index');

async function spCreateCategory(title) {
    const exists = await sequelize.query(
        `SELECT 1 FROM "static_content"."area" WHERE "title" = :title`,
        { replacements: { title }, type: QueryTypes.SELECT }
    );

    if (exists.length === 0) {
        await sequelize.query(
            `INSERT INTO "static_content"."area" ("title") VALUES (:title)`,
            { replacements: { title }, type: QueryTypes.INSERT }
        );
    } else {
        console.log('Category already exists.');
    }
}

async function spCreateSubArea(areaId, title) {
    const exists = await sequelize.query(
        `SELECT 1 FROM "static_content"."sub_area" WHERE "title" = :title`,
        { replacements: { title }, type: QueryTypes.SELECT }
    );

    if (exists.length === 0) {
        await sequelize.query(
            `INSERT INTO "static_content"."sub_area" ("area_id", "title") VALUES (:areaId, :title)`,
            { replacements: { areaId, title }, type: QueryTypes.INSERT }
        );
    } else {
        console.log('SubArea already exists.');
    }
}

module.exports = {
    spCreateCategory,
    spCreateSubArea
}
