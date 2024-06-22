const { QueryTypes } = require('sequelize');
const sequelize = require('../models/index');

//Procedure to Create a Forum
async function spCreateForum(subAreaId, title, description, createdBy, adminId = null) {
    const isOfficeAdmin = await fnIsPublisherOfficeAdmin(createdBy);
    const validated = isOfficeAdmin ? 1 : 0;
    adminId = isOfficeAdmin ? createdBy : adminId;

    const transaction = await sequelize.transaction();
    try {
        await sequelize.query(
            `INSERT INTO "dynamic_content"."forums" 
        ("sub_area_id", "title", "content", "creation_date", "publisher_id", "admin_id", "validated")
        VALUES (:subAreaId, :title, :description, CURRENT_TIMESTAMP, :createdBy, :adminId, :validated)`,
            {
                replacements: { subAreaId, title, description, createdBy, adminId, validated },
                type: QueryTypes.INSERT,
                transaction
            }
        );

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

//Procedure to Create a Forum for an Event
async function spCreateForumForEvent(subAreaId, title, description, createdBy, adminId = null, eventId) {
    const isOfficeAdmin = await fnIsPublisherOfficeAdmin(createdBy);
    const validated = isOfficeAdmin ? 1 : 0;
    adminId = isOfficeAdmin ? createdBy : adminId;

    const transaction = await sequelize.transaction();
    try {
        const [result] = await sequelize.query(
            `INSERT INTO "dynamic_content"."forums" 
        ("sub_area_id", "title", "content", "creation_date", "publisher_id", "admin_id", "event_id", "validated")
        VALUES (:subAreaId, :title, :description, CURRENT_TIMESTAMP, :createdBy, :adminId, :eventId, :validated)
        RETURNING "forum_id"`,
            {
                replacements: { subAreaId, title, description, createdBy, adminId, eventId, validated },
                type: QueryTypes.INSERT,
                transaction
            }
        );

        const forumId = result.forum_id;
        await sequelize.query(
            `INSERT INTO "control"."event_forum_access" ("user_id", "forum_id")
        VALUES (:createdBy, :forumId)`,
            { replacements: { createdBy, forumId }, type: QueryTypes.INSERT, transaction }
        );

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

//Function to Get Forum State
async function fnGetForumState(forumId) {
    const result = await sequelize.query(
        `SELECT CASE WHEN "validated" = 1 THEN 'Validated' ELSE 'Pending' END AS "state"
      FROM "dynamic_content"."forums"
      WHERE "forum_id" = :forumId`,
        { replacements: { forumId }, type: QueryTypes.SELECT }
    );

    return result.length ? result[0].state : null;
}

//Procedure to Edit a Forum
async function spEditForum(forumId, subAreaId = null, officeId = null, adminId = null, title = null, content = null, eventId = null) {
    const transaction = await sequelize.transaction();
    try {
        const forum = await sequelize.query(
            `SELECT "validated" FROM "dynamic_content"."forums" WHERE "forum_id" = :forumId`,
            { replacements: { forumId }, type: QueryTypes.SELECT, transaction }
        );

        if (forum.length && forum[0].validated === 0) {
            await sequelize.query(
                `UPDATE "dynamic_content"."forums"
          SET
            "sub_area_id" = COALESCE(:subAreaId, "sub_area_id"),
            "office_id" = COALESCE(:officeId, "office_id"),
            "admin_id" = COALESCE(:adminId, "admin_id"),
            "title" = COALESCE(:title, "title"),
            "content" = COALESCE(:content, "content"),
            "event_id" = COALESCE(:eventId, "event_id")
          WHERE "forum_id" = :forumId`,
                {
                    replacements: { forumId, subAreaId, officeId, adminId, title, content, eventId },
                    type: QueryTypes.UPDATE,
                    transaction
                }
            );
        } else {
            console.log('Forum is already validated and cannot be edited.');
        }

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

module.exports = {
    spCreateForum,
    spCreateForumForEvent,
    fnGetForumState,
    spEditForum
}