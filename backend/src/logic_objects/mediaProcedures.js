const { QueryTypes } = require('sequelize');
const sequelize = require('../models/index');

//Procedure to Create an Album
async function spCreateAlbum(eventId, subAreaId, title) {
    const transaction = await sequelize.transaction();
    try {
        await sequelize.query(
            `INSERT INTO "dynamic_content"."albums" ("event_id", "sub_area_id", "creation_date", "title")
        VALUES (:eventId, :subAreaId, CURRENT_TIMESTAMP, :title)`,
            { replacements: { eventId, subAreaId, title }, type: QueryTypes.INSERT, transaction }
        );

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

//Procedure to Add a Photograph
async function spAddPhotograph(albumId, publisherId, filePath) {
    const transaction = await sequelize.transaction();
    try {
        await sequelize.query(
            `INSERT INTO "dynamic_content"."photographs" ("album_id", "publisher_id", "filepath", "upload_date")
        VALUES (:albumId, :publisherId, :filePath, CURRENT_TIMESTAMP)`,
            { replacements: { albumId, publisherId, filePath }, type: QueryTypes.INSERT, transaction }
        );

        await transaction.commit();
    } catch (error) {
        await transaction

            .rollback();
        throw error;
    }
}

module.exports = {
    spCreateAlbum,
    spAddPhotograph
}