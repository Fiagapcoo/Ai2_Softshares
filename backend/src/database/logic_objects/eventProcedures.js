const { QueryTypes } = require('sequelize');
const sequelize = require('../models/index');

//Procedure to Create an Event
async function spCreateEvent(officeId, subAreaId, adminId = null, name, description, eventDate, recurring, location) {
    const isOfficeAdmin = await fnIsPublisherOfficeAdmin(createdBy);
    const validated = isOfficeAdmin ? 1 : 0;
    adminId = isOfficeAdmin ? createdBy : adminId;

    const transaction = await sequelize.transaction();
    try {
        await sequelize.query(
            `INSERT INTO "dynamic_content"."events" 
        ("office_id", "subarea_id", "admin_id", "creation_date", "name", "description", "event_date", "recurring", "event_location", "validated")
        VALUES (:officeId, :subAreaId, :adminId, CURRENT_TIMESTAMP, :name, :description, :eventDate, :recurring, :location, :validated)`,
            {
                replacements: { officeId, subAreaId, adminId, name, description, eventDate, recurring, location, validated },
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

//Procedure to Clean Up Event Participation
async function spEventParticipationCleanup() {
    const transaction = await sequelize.transaction();
    try {
        const inactiveUsers = await sequelize.query(
            `SELECT ep."user_id", ep."event_id"
        FROM "control"."participation" ep
        JOIN "hr"."users" u ON ep."user_id" = u."user_id"
        WHERE u."is_active" = 0`,
            { type: QueryTypes.SELECT, transaction }
        );

        for (const user of inactiveUsers) {
            await sequelize.query(
                `DELETE FROM "control"."participation"
          WHERE "user_id" = :userId AND "event_id" = :eventId`,
                { replacements: { userId: user.user_id, eventId: user.event_id }, type: QueryTypes.DELETE, transaction }
            );
        }

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

//Procedure to Unregister a User from an Event
async function spUnregisterUserFromEvent(userId, eventId) {
    const transaction = await sequelize.transaction();
    try {
        const forumIdResult = await sequelize.query(
            `SELECT "forum_id"
        FROM "dynamic_content"."forums"
        WHERE "event_id" = :eventId`,
            { replacements: { eventId }, type: QueryTypes.SELECT, transaction }
        );

        if (forumIdResult.length === 0) {
            throw new Error('Forum not found for the event.');
        }

        const forumId = forumIdResult[0].forum_id;

        await sequelize.query(
            `DELETE FROM "control"."participation"
        WHERE "user_id" = :userId AND "event_id" = :eventId`,
            { replacements: { userId, eventId }, type: QueryTypes.DELETE, transaction }
        );

        await sequelize.query(
            `DELETE FROM "control"."event_forum_access"
        WHERE "user_id" = :userId AND "forum_id" = :forumId`,
            { replacements: { userId, forumId }, type: QueryTypes.DELETE, transaction }
        );

        await sequelize.query(
            `UPDATE "dynamic_content"."events"
        SET "current_participants" = "current_participants" - 1
        WHERE "event_id" = :eventId`,
            { replacements: { eventId }, type: QueryTypes.UPDATE, transaction }
        );

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}


//Function to Get Event State
async function fnGetEventState(eventId) {
    const result = await sequelize.query(
        `SELECT CASE WHEN "validated" = 1 THEN 'Validated' ELSE 'Pending' END AS "state"
      FROM "dynamic_content"."events"
      WHERE "event_id" = :eventId`,
        { replacements: { eventId }, type: QueryTypes.SELECT }
    );

    return result.length ? result[0].state : null;
}

//Procedure to Edit an Event
async function spEditEvent(eventId, subAreaId = null, officeId = null, adminId = null, name = null, description = null, eventDate = null, eventLocation = null, filePath = null, recurring = null, recurringPattern = null, maxParticipants = null, currentParticipants = null) {
    const transaction = await sequelize.transaction();
    try {
        const event = await sequelize.query(
            `SELECT "validated" FROM "dynamic_content"."events" WHERE "event_id" = :eventId`,
            { replacements: { eventId }, type: QueryTypes.SELECT, transaction }
        );

        if (event.length && event[0].validated === 0) {
            await sequelize.query(
                `UPDATE "dynamic_content"."events"
          SET
            "subarea_id" = COALESCE(:subAreaId, "subarea_id"),
            "office_id" = COALESCE(:officeId, "office_id"),
            "admin_id" = COALESCE(:adminId, "admin_id"),
            "name" = COALESCE(:name, "name"),
            "description" = COALESCE(:description, "description"),
            "event_date" = COALESCE(:eventDate, "event_date"),
            "event_location" = COALESCE(:eventLocation, "event_location"),
            "filepath" = COALESCE(:filePath, "filepath"),
            "recurring" = COALESCE(:recurring, "recurring"),
            "recurring_pattern" = COALESCE(:recurringPattern, "recurring_pattern"),
            "max_participants" = COALESCE(:maxParticipants, "max_participants"),
            "current_participants" = COALESCE(:currentParticipants, "current_participants")
          WHERE "event_id" = :eventId`,
                {
                    replacements: { eventId, subAreaId, officeId, adminId, name, description, eventDate, eventLocation, filePath, recurring, recurringPattern, maxParticipants, currentParticipants },
                    type: QueryTypes.UPDATE,
                    transaction
                }
            );
        } else {
            console.log('Event is already validated and cannot be edited.');
        }

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

module.exports = {
    spCreateEvent,
    spEventParticipationCleanup,
    spUnregisterUserFromEvent,
    fnGetEventState,
    spEditEvent
}