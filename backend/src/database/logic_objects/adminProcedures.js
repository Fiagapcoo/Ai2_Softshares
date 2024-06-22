const { QueryTypes } = require('sequelize');
const sequelize = require('../models/index');

async function getUserEngagementMetrics() {
    try {
      const results = await sequelize.query(
        `SELECT ACTION_TYPE, COUNT(*) AS "ACTION_Count"
         FROM "USER_INTERACTIONS"."USER_ACTIONS_LOG"
         GROUP BY ACTION_TYPE`,
        {
          type: QueryTypes.SELECT
        }
      );
      return results;
    } catch (error) {
      console.error('Error fetching user engagement metrics:', error);
      throw error;
    }
}

async function getContentValidationStatusByAdmin(adminID) {
    try {
      const centerID = await sequelize.query(
        `SELECT oa."OFFICE_ID"
         FROM "CENTERS"."OFFICE_ADMINS" oa
         WHERE oa."MANAGER_ID" = :adminID`,
        {
          replacements: { adminID },
          type: QueryTypes.SELECT
        }
      );
  
      if (!centerID.length) {
        console.log('Invalid AdminID or AdminID not associated with any Center');
        return [];
      }
  
      const results = await sequelize.query(
        `SELECT cvs."CONTENT_TYPE", cvs."CONTENT_STATUS", COUNT(*) AS "CONTENT_count"
         FROM "ADMIN"."CONTENT_VALIDATION_STATUS" cvs
         INNER JOIN "DYNAMIC_CONTENT"."POSTS" p ON cvs."CONTENT_REAL_ID" = p."POST_ID" AND cvs."CONTENT_TYPE" = 'Post' AND p."OFFICE_ID" = :centerID
         GROUP BY cvs."CONTENT_TYPE", cvs."CONTENT_STATUS"
         UNION
         SELECT cvs."CONTENT_TYPE", cvs."CONTENT_STATUS", COUNT(*) AS "CONTENT_count"
         FROM "ADMIN"."CONTENT_VALIDATION_STATUS" cvs
         INNER JOIN "DYNAMIC_CONTENT"."EVENTS" e ON cvs."CONTENT_REAL_ID" = e."EVENT_ID" AND cvs."CONTENT_TYPE" = 'Event' AND e."OFFICE_ID" = :centerID
         GROUP BY cvs."CONTENT_TYPE", cvs."CONTENT_STATUS"
         UNION
         SELECT cvs."CONTENT_TYPE", cvs."CONTENT_STATUS", COUNT(*) AS "CONTENT_count"
         FROM "ADMIN"."CONTENT_VALIDATION_STATUS" cvs
         INNER JOIN "DYNAMIC_CONTENT"."FORUMS" f ON cvs."CONTENT_REAL_ID" = f."FORUM_ID" AND cvs."CONTENT_TYPE" = 'Forum' AND f."OFFICE_ID" = :centerID
         GROUP BY cvs."CONTENT_TYPE", cvs."CONTENT_STATUS"`,
        {
          replacements: { centerID: centerID[0].OFFICE_ID },
          type: QueryTypes.SELECT
        }
      );
      return results;
    } catch (error) {
      console.error('Error fetching content validation status by admin:', error);
      throw error;
    }
}

async function getContentValidationStatus() {
    try {
      const results = await sequelize.query(
        `SELECT "CONTENT_TYPE", "CONTENT_STATUS", COUNT(*) AS "CONTENT_count"
         FROM "ADMIN"."CONTENT_VALIDATION_STATUS"
         GROUP BY "CONTENT_TYPE", "CONTENT_STATUS"`,
        {
          type: QueryTypes.SELECT
        }
      );
      return results;
    } catch (error) {
      console.error('Error fetching content validation status:', error);
      throw error;
    }
}

async function getActiveDiscussions() {
    try {
      const results = await sequelize.query(
        `SELECT d."FORUM_ID", f."TITLE", d."LAST_ACTIVITY_DATE", d."ACTIVE_PARTICIPANTS"
         FROM "ADMIN"."ACTIVE_DISCUSSIONS" d
         JOIN "DYNAMIC_CONTENT"."FORUMS" f ON d."FORUM_ID" = f."FORUM_ID"
         ORDER BY d."LAST_ACTIVITY_DATE" DESC`,
        {
          type: QueryTypes.SELECT
        }
      );
      return results;
    } catch (error) {
      console.error('Error fetching active discussions:', error);
      throw error;
    }
}

async function validateContent(contentID, validatorID, status) {
    try {
      await sequelize.transaction(async (transaction) => {
        const officeCenterID = await sequelize.query(
          `SELECT "OFFICE_ID"
           FROM "CENTERS"."REGIONAL_OFFICE"
           WHERE "MANAGER_ID" = :validatorID`,
          {
            replacements: { validatorID },
            type: QueryTypes.SELECT,
            transaction
          }
        );
  
        if (!officeCenterID.length) {
          console.log('Unauthorized validation attempt.');
          throw new Error('Unauthorized validation attempt.');
        }
  
        const isAuthorized = await sequelize.query(
          `SELECT 1
           FROM "DYNAMIC_CONTENT"."POSTS" p
           JOIN "CENTERS"."REGIONAL_OFFICE" ro ON p."OFFICE_ID" = ro."OFFICE_ID"
           WHERE p."POST_ID" = :contentID AND ro."OFFICE_ID" = :officeCenterID`,
          {
            replacements: { contentID, officeCenterID: officeCenterID[0].OFFICE_ID },
            type: QueryTypes.SELECT,
            transaction
          }
        );
  
        if (!isAuthorized.length) {
          console.log('Unauthorized validation attempt.');
          throw new Error('Unauthorized validation attempt.');
        }
  
        await sequelize.query(
          `UPDATE "ADMIN"."CONTENT_VALIDATION_STATUS"
           SET "CONTENT_STATUS" = :status, "VALIDATION_DATE" = NOW(), "VALIDATOR_ID" = :validatorID
           WHERE "CONTENT_ID" = :contentID`,
          {
            replacements: { contentID, status, validatorID },
            type: QueryTypes.UPDATE,
            transaction
          }
        );
      });
    } catch (error) {
      console.error('Error validating content:', error);
      throw error;
    }
}

async function getActiveWarnings() {
    try {
      const results = await sequelize.query(
        `SELECT "WARNING_ID", "WARNING_LEVEL", "DESCRIPTION", "STATE", "CREATION_DATE", "ADMIN_ID", "OFFICE_ID"
         FROM "CONTROL"."WARNINGS"
         WHERE "STATE" = 1`,
        {
          type: QueryTypes.SELECT
        }
      );
      return results;
    } catch (error) {
      console.error('Error fetching active warnings:', error);
      throw error;
    }
}

async function getContentCenterToBeValidated(centerID) {
    try {
      const results = await sequelize.query(
        `SELECT
          cvs."CONTENT_TYPE",
          cvs."CONTENT_STATUS",
          cvs."CONTENT_REAL_ID",
          cvs."VALIDATION_DATE",
          cvs."VALIDATOR_ID"
         FROM "ADMIN"."CONTENT_VALIDATION_STATUS" cvs
         JOIN "DYNAMIC_CONTENT"."POSTS" p ON cvs."CONTENT_TYPE" = 'Post' AND cvs."CONTENT_REAL_ID" = p."POST_ID" AND p."OFFICE_ID" = :centerID
         WHERE cvs."CONTENT_STATUS" = 'Pending'
         UNION ALL
         SELECT
          cvs."CONTENT_TYPE",
          cvs."CONTENT_STATUS",
          cvs."CONTENT_REAL_ID",
          cvs."VALIDATION_DATE",
          cvs."VALIDATOR_ID"
         FROM "ADMIN"."CONTENT_VALIDATION_STATUS" cvs
         JOIN "DYNAMIC_CONTENT"."EVENTS" e ON cvs."CONTENT_TYPE" = 'Event' AND cvs."CONTENT_REAL_ID" = e."EVENT_ID" AND e."OFFICE_ID" = :centerID
         WHERE cvs."CONTENT_STATUS" = 'Pending'
         UNION ALL
         SELECT
          cvs."CONTENT_TYPE",
          cvs."CONTENT_STATUS",
          cvs."CONTENT_REAL_ID",
          cvs."VALIDATION_DATE",
          cvs."VALIDATOR_ID"
         FROM "ADMIN"."CONTENT_VALIDATION_STATUS" cvs
         JOIN "DYNAMIC_CONTENT"."FORUMS" f ON cvs."CONTENT_TYPE" = 'Forum' AND cvs."CONTENT_REAL_ID" = f."FORUM_ID" AND f."OFFICE_ID" = :centerID
         WHERE cvs."CONTENT_STATUS" = 'Pending'`,
        {
          replacements: { centerID },
          type: QueryTypes.SELECT
        }
      );
      return results;
    } catch (error) {
      console.error('Error fetching content center to be validated:', error);
      throw error;
    }
}
  

async function createCenter(city) {
    try {
      await sequelize.query(
        `INSERT INTO "CENTERS"."OFFICES" ("CITY")
         VALUES (:city)`,
        {
          replacements: { city },
          type: QueryTypes.INSERT
        }
      );
    } catch (error) {
      console.error('Error creating center:', error);
      throw error;
    }
}

async function deleteCenter(centerID) {
    try {
      await sequelize.query(
        `DELETE FROM "CENTERS"."OFFICES"
         WHERE "OFFICE_ID" = :centerID`,
        {
          replacements: { centerID },
          type: QueryTypes.DELETE
        }
      );
    } catch (error) {
      console.error('Error deleting center:', error);
      throw error;
    }
}

module.exports = {
    getUserEngagementMetrics,
    getContentValidationStatusByAdmin,
    getContentValidationStatus,
    getActiveDiscussions,
    validateContent,
    getActiveWarnings,
    getContentCenterToBeValidated,
    createCenter,
    deleteCenter
    
};