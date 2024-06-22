const { QueryTypes } = require('sequelize');
const sequelize = require('../models/index');
const { fnIsPublisherOfficeAdmin } = require('../database/logic_objects/generalHelpers');

//Procedure to Create a Post
async function spCreatePost(subAreaId, officeId, adminId, publisherId, type, title, content, pLocation, filePath, rating) {
    const isOfficeAdmin = await fnIsPublisherOfficeAdmin(publisherId);
    const validated = isOfficeAdmin ? 1 : 0;
    adminId = isOfficeAdmin ? publisherId : adminId;

    const transaction = await sequelize.transaction();
    try {
        const [result] = await sequelize.query(
            `INSERT INTO "dynamic_content"."posts" 
        ("sub_area_id", "office_id", "admin_id", "publisher_id", "creation_date", "type", "title", "content", "p_location", "filepath", "validated")
        VALUES (:subAreaId, :officeId, :adminId, :publisherId, CURRENT_TIMESTAMP, :type, :title, :content, :pLocation, :filePath, :validated)
        RETURNING "post_id"`,
            {
                replacements: { subAreaId, officeId, adminId, publisherId, type, title, content, pLocation, filePath, validated },
                type: QueryTypes.INSERT,
                transaction
            }
        );

        const postId = result.post_id;
        await sequelize.query(
            `INSERT INTO "dynamic_content"."ratings" 
        ("post_id", "event_id", "critic_id", "evaluation")
        VALUES (:postId, NULL, :publisherId, :rating)`,
            { replacements: { postId, publisherId, rating }, type: QueryTypes.INSERT, transaction }
        );

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

// Function to Get Post State
async function fnGetPostState(postId) {
    const result = await sequelize.query(
        `SELECT CASE WHEN "validated" = 1 THEN 'Validated' ELSE 'Pending' END AS "state"
      FROM "dynamic_content"."posts"
      WHERE "post_id" = :postId`,
        { replacements: { postId }, type: QueryTypes.SELECT }
    );

    return result.length ? result[0].state : null;
}

//Procedure to Edit a Post
async function spEditPost(postId, subAreaId = null, officeId = null, adminId = null, title = null, content = null, pLocation = null, filePath = null, type = null) {
    const transaction = await sequelize.transaction();
    try {
        const post = await sequelize.query(
            `SELECT "validated" FROM "dynamic_content"."posts" WHERE "post_id" = :postId`,
            { replacements: { postId }, type: QueryTypes.SELECT, transaction }
        );

        if (post.length && post[0].validated === 0) {
            await sequelize.query(
                `UPDATE "dynamic_content"."posts"
          SET
            "sub_area_id" = COALESCE(:subAreaId, "sub_area_id"),
            "office_id" = COALESCE(:officeId, "office_id"),
            "admin_id" = COALESCE(:adminId, "admin_id"),
            "title" = COALESCE(:title, "title"),
            "content" = COALESCE(:content, "content"),
            "p_location" = COALESCE(:pLocation, "p_location"),
            "filepath" = COALESCE(:filePath, "filepath"),
            "type" = COALESCE(:type, "type")
          WHERE "post_id" = :postId`,
                {
                    replacements: { postId, subAreaId, officeId, adminId, title, content, pLocation, filePath, type },
                    type: QueryTypes.UPDATE,
                    transaction
                }
            );
        } else {
            console.log('Post is already validated and cannot be edited.');
        }

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

module.exports = {
    spCreatePost,
    fnGetPostState,
    spEditPost
}