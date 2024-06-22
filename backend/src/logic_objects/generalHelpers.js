const { QueryTypes } = require('sequelize');
const sequelize = require('../models/index');

//Procedure to Validate Content
async function spValidateContent(contentType, contentId, adminId) {
    const transaction = await sequelize.transaction();
    try {
        await sequelize.query(
            `UPDATE "admin"."content_validation_status"
        SET "validator_id" = :adminId, "validation_date" = CURRENT_TIMESTAMP, "content_status" = 'Approved'
        WHERE "content_real_id" = :contentId AND "content_type" = :contentType`,
            { replacements: { contentId, contentType, adminId }, type: QueryTypes.UPDATE, transaction }
        );

        const contentTables = {
            Post: 'posts',
            Event: 'events',
            Forum: 'forums'
        };

        const table = contentTables[contentType];
        if (!table) {
            throw new Error('Invalid content type');
        }

        await sequelize.query(
            `UPDATE "dynamic_content"."${table}"
        SET "validated" = 1
        WHERE "${contentType.toLowerCase()}_id" = :contentId`,
            { replacements: { contentId }, type: QueryTypes.UPDATE, transaction }
        );

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

//Procedure to Reject Content
async function spRejectContent(contentType, contentId, adminId) {
    const transaction = await sequelize.transaction();
    try {
        const validContentTypes = ['Post', 'Event', 'Forum'];
        if (!validContentTypes.includes(contentType)) {
            throw new Error('Invalid ContentType. Only "Post", "Event", and "Forum" are allowed.');
        }

        await sequelize.query(
            `UPDATE "admin"."content_validation_status"
        SET "validator_id" = :adminId, "validation_date" = CURRENT_TIMESTAMP, "content_status" = 'Rejected'
        WHERE "content_real_id" = :contentId AND "content_type" = :contentType`,
            { replacements: { contentId, contentType, adminId }, type: QueryTypes.UPDATE, transaction }
        );

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

//Procedure to Insert a New Rating/Evaluation
async function spInsertEvaluation(contentType, contentId, criticId, evaluation) {
    const transaction = await sequelize.transaction();
    try {
        const validContentTypes = ['Post', 'Event'];
        if (!validContentTypes.includes(contentType)) {
            throw new Error('Invalid ContentType. Only "Post" and "Event" are allowed.');
        }

        const table = contentType === 'Post' ? 'posts' : 'events';

        await sequelize.query(
            `INSERT INTO "dynamic_content"."ratings" ("${table}_id", "critic_id", "evaluation_date", "evaluation")
        VALUES (:contentId, :criticId, CURRENT_TIMESTAMP, :evaluation)`,
            { replacements: { contentId, criticId, evaluation }, type: QueryTypes.INSERT, transaction }
        );

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

//Function to Calculate New Average Rating
async function fnReverseRating(avgRating, numOfRatings, newRating) {
    const totalOfRatings = avgRating * numOfRatings + newRating;
    const newAvgRating = totalOfRatings / (numOfRatings + 1);
    return newAvgRating;
}


//Trigger to Update Average Score on Content
async function trgUpdateAverageScore() {
    const transaction = await sequelize.transaction();
    try {
        const insertedRows = await sequelize.query(
            `SELECT "event_id", "post_id"
        FROM INSERTED`,
            { type: QueryTypes.SELECT, transaction }
        );

        for (const row of insertedRows) {
            const { event_id: eventId, post_id: postId } = row;
            const table = postId ? 'post_id' : 'event_id';
            const contentId = postId || eventId;

            const [currentAvgScore] = await sequelize.query(
                `SELECT "score", "num_of_evals"
          FROM "dynamic_content"."scores"
          WHERE "${table}" = :contentId`,
                { replacements: { contentId }, type: QueryTypes.SELECT, transaction }
            );

            if (currentAvgScore) {
                const newAvgRating = await fnReverseRating(currentAvgScore.score, currentAvgScore.num_of_evals, newRating);

                await sequelize.query(
                    `UPDATE "dynamic_content"."scores"
            SET "score" = :newAvgRating, "num_of_evals" = "num_of_evals" + 1
            WHERE "${table}" = :contentId`,
                    { replacements: { newAvgRating, contentId }, type: QueryTypes.UPDATE, transaction }
                );
            }
        }

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}




module.exports = {
    spValidateContent,
    spRejectContent,
    spInsertEvaluation,
    fnReverseRating,
    trgUpdateAverageScore,
    
}