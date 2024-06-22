const { sequelize } = require('../models/index');
const { QueryTypes } = require('sequelize');

async function triggerNotifications({ eventID = null, postID = null, areaID = null, subAreaID = null }) {
  const t = await sequelize.transaction();
  try {
    if (eventID) {
      await sequelize.query(
        `INSERT INTO "USER_INTERACTIONS"."NOTIFICATIONS" ("USER_ID", "EVENT_ID", "NOTIFICATION_TEXT")
         SELECT "USER_ID", :eventID, 'New event posted in your preferred area'
         FROM "USER_INTERACTIONS"."USER_PREF"
         WHERE "ReceiveNotifications" = 1
           AND (
             (ISJSON("AREAS") = 1 AND :areaID IS NOT NULL AND EXISTS (
               SELECT 1 FROM OPENJSON("AREAS") WHERE value = :areaID
             ))
             OR
             (ISJSON("SUB_AREAS") = 1 AND :subAreaID IS NOT NULL AND EXISTS (
               SELECT 1 FROM OPENJSON("SUB_AREAS") WHERE value = :subAreaID
             ))
           )`,
        {
          replacements: { eventID, areaID, subAreaID },
          type: QueryTypes.INSERT,
          transaction: t
        }
      );
    }

    if (postID) {
      await sequelize.query(
        `INSERT INTO "USER_INTERACTIONS"."NOTIFICATIONS" ("USER_ID", "POST_ID", "NOTIFICATION_TEXT")
         SELECT "USER_ID", :postID, 'New post in your preferred area'
         FROM "USER_INTERACTIONS"."USER_PREF"
         WHERE "ReceiveNotifications" = 1
           AND (
             (ISJSON("AREAS") = 1 AND :areaID IS NOT NULL AND EXISTS (
               SELECT 1 FROM OPENJSON("AREAS") WHERE value = :areaID
             ))
             OR
             (ISJSON("SUB_AREAS") = 1 AND :subAreaID IS NOT NULL AND EXISTS (
               SELECT 1 FROM OPENJSON("SUB_AREAS") WHERE value = :subAreaID
             ))
           )`,
        {
          replacements: { postID, areaID, subAreaID },
          type: QueryTypes.INSERT,
          transaction: t
        }
      );
    }

    await t.commit();
  } catch (error) {
    await t.rollback();
    console.error('Error triggering notifications:', error);
    throw error;
  }
}

async function notifyEventChanges(eventID, subAreaID) {
    const areaID = subAreaID ? subAreaID.toString().slice(0, 3) : null;
    try {
      await triggerNotifications({ eventID, areaID, subAreaID });
    } catch (error) {
      console.error('Error notifying event changes:', error);
      throw error;
    }
}

async function notifyEventComments(commentID, forumID) {
    const t = await sequelize.transaction();
    try {
      const [event] = await sequelize.query(
        `SELECT "e"."EVENT_ID", LEFT("e"."SUBAREA_ID", 3) AS "AreaID", "e"."SUBAREA_ID" AS "SubAreaID"
         FROM "DYNAMIC_CONTENT"."FORUMS" f
         JOIN "DYNAMIC_CONTENT"."EVENTS" e ON f."EVENT_ID" = e."EVENT_ID"
         WHERE f."FORUM_ID" = :forumID`,
        {
          replacements: { forumID },
          type: QueryTypes.SELECT,
          transaction: t
        }
      );
  
      if (event) {
        await triggerNotifications({ eventID: event.EVENT_ID, areaID: event.AreaID, subAreaID: event.SubAreaID });
      }
  
      await t.commit();
    } catch (error) {
      await t.rollback();
      console.error('Error notifying event comments:', error);
      throw error;
    }
}
  
async function notifyEventCreator(eventID, interactionDescription) {
    const t = await sequelize.transaction();
    try {
      const [eventCreator] = await sequelize.query(
        `SELECT "PUBLISHER_ID" FROM "DYNAMIC_CONTENT"."EVENTS" WHERE "EVENT_ID" = :eventID`,
        {
          replacements: { eventID },
          type: QueryTypes.SELECT,
          transaction: t
        }
      );
  
      if (eventCreator && eventCreator.PUBLISHER_ID) {
        await sequelize.query(
          `INSERT INTO "USER_INTERACTIONS"."NOTIFICATIONS" ("USER_ID", "EVENT_ID", "NOTIFICATION_TEXT")
           VALUES (:creatorID, :eventID, :interactionDescription)`,
          {
            replacements: { creatorID: eventCreator.PUBLISHER_ID, eventID, interactionDescription },
            type: QueryTypes.INSERT,
            transaction: t
          }
        );
      }
  
      await t.commit();
    } catch (error) {
      await t.rollback();
      console.error('Error notifying event creator:', error);
      throw error;
    }
}

async function notifyEventInteractions(eventID) {
    const interactionDescription = 'A new user has registered for your event';
    try {
      await notifyEventCreator(eventID, interactionDescription);
    } catch (error) {
      console.error('Error notifying event interactions:', error);
      throw error;
    }
}
  

module.exports = {
  triggerNotifications,
  notifyEventChanges,
  notifyEventComments,
  notifyEventCreator,
  notifyEventInteractions
};
