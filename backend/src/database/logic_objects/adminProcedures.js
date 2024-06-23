const { QueryTypes } = require('sequelize');
const db = require('../../models'); 

async function getUserEngagementMetrics() {
    try {
      const results = await db.sequelize.query(
        `SELECT action_type, COUNT(*) AS "action_count"
         FROM "user_interactions"."user_actions_log"
         GROUP BY action_type`,
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

async function getcontentValidationStatusByadmin(adminID) {
    try {
      const center_id = await db.sequelize.query(
        `SELECT oa."office_id"
         FROM "centers"."office_admins" oa
         WHERE oa."manager_id" = :adminID`,
        {
          replacements: { adminID },
          type: QueryTypes.SELECT
        }
      );
  
      if (!center_id.length) {
        console.log('Invalid adminID or adminID not associated with any Center');
        return [];
      }
  
      const results = await db.sequelize.query(
        `SELECT cvs."content_type", cvs."content_status", COUNT(*) AS "content_count"
         FROM "admin"."content_validation_status" cvs
         INNER JOIN "dynamic_content"."posts" p ON cvs."content_real_id" = p."post_id" AND cvs."content_type" = 'Post' AND p."office_id" = :center_id
         GROUP BY cvs."content_type", cvs."content_status"
         UNION
         SELECT cvs."content_type", cvs."content_status", COUNT(*) AS "content_count"
         FROM "admin"."content_validation_status" cvs
         INNER JOIN "dynamic_content"."events" e ON cvs."content_real_id" = e."event_id" AND cvs."content_type" = 'Event' AND e."office_id" = :center_id
         GROUP BY cvs."content_type", cvs."content_status"
         UNION
         SELECT cvs."content_type", cvs."content_status", COUNT(*) AS "content_count"
         FROM "admin"."content_validation_status" cvs
         INNER JOIN "dynamic_content"."forums" f ON cvs."content_real_id" = f."forum_id" AND cvs."content_type" = 'Forum' AND f."office_id" = :center_id
         GROUP BY cvs."content_type", cvs."content_status"`,
        {
          replacements: { center_id: center_id[0].office_id },
          type: QueryTypes.SELECT
        }
      );
      return results;
    } catch (error) {
      console.error('Error fetching content validation status by admin:', error);
      throw error;
    }
}

async function getcontentValidationStatus() {
    try {
      const results = await db.sequelize.query(
        `SELECT "content_type", "content_status", COUNT(*) AS "content_count"
         FROM "admin"."content_validation_status"
         GROUP BY "content_type", "content_status"`,
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
      const results = await db.sequelize.query(
        `SELECT d."forum_id", f."title", d."last_activity_date", d."active_participants"
         FROM "admin"."active_discussions" d
         JOIN "dynamic_content"."forums" f ON d."forum_id" = f."forum_id"
         ORDER BY d."last_activity_date" DESC`,
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

//needs attention
async function validatecontent(contentID, validatorID, status) {
    try {
      await db.sequelize.transaction(async (transaction) => {
        const officecenter_id = await sequelize.query(
          `SELECT "office_id"
           FROM "centers"."office_admins"
           WHERE "manager_id" = :validatorID`,
          {
            replacements: { validatorID },
            type: QueryTypes.SELECT,
            transaction
          }
        );
  
        if (!officecenter_id.length) {
          console.log('Unauthorized validation attempt.');
          throw new Error('Unauthorized validation attempt.');
        }
  
        const isAuthorized = await db.sequelize.query(
          `SELECT 1
           FROM "dynamic_content"."posts" p
           JOIN "centers"."office_admins" ro ON p."office_id" = ro."office_id"
           WHERE p."post_id" = :contentID AND ro."office_id" = :officecenter_id`,
          {
            replacements: { contentID, officecenter_id: officecenter_id[0].office_id },
            type: QueryTypes.SELECT,
            transaction
          }
        );
  
        if (!isAuthorized.length) {
          console.log('Unauthorized validation attempt.');
          throw new Error('Unauthorized validation attempt.');
        }
  
        await db.sequelize.query(
          `UPDATE "admin"."content_validation_status"
           SET "content_status" = :status, "validation_date" = CURRENT_TIMESTAMP, "validator_id" = :validatorID
           WHERE "content_id" = :contentID`,
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
      const results = await db.sequelize.query(
        `SELECT "warning_id", "warning_level", "description", "state", "creation_date", "admin_id", "office_id"
         FROM "control"."warnings"
         WHERE "state" = 1`,
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

async function getcontentCenterToBeValidated(center_id) {
    try {
      const results = await db.sequelize.query(
        `SELECT
          cvs."content_type",
          cvs."content_status",
          cvs."content_real_id",
          cvs."validation_date",
          cvs."validator_id"
         FROM "admin"."content_validation_status" cvs
         JOIN "dynamic_content"."posts" p ON cvs."content_type" = 'Post' AND cvs."content_real_id" = p."post_id" AND p."office_id" = :center_id
         WHERE cvs."content_status" = 'Pending'
         UNION ALL
         SELECT
          cvs."content_type",
          cvs."content_status",
          cvs."content_real_id",
          cvs."validation_date",
          cvs."validator_id"
         FROM "admin"."content_validation_status" cvs
         JOIN "dynamic_content"."events" e ON cvs."content_type" = 'Event' AND cvs."content_real_id" = e."event_id" AND e."office_id" = :center_id
         WHERE cvs."content_status" = 'Pending'
         UNION ALL
         SELECT
          cvs."content_type",
          cvs."content_status",
          cvs."content_real_id",
          cvs."validation_date",
          cvs."validator_id"
         FROM "admin"."content_validation_status" cvs
         JOIN "dynamic_content"."forums" f ON cvs."content_type" = 'Forum' AND cvs."content_real_id" = f."forum_id" AND f."office_id" = :center_id
         WHERE cvs."content_status" = 'Pending'`,
        {
          replacements: { center_id },
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
      await db.sequelize.query(
        `INSERT INTO "centers"."offices" ("city")
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

async function deleteCenter(center_id) {
    try {
      await db.sequelize.query(
        `DELETE FROM "centers"."offices"
         WHERE "office_id" = :center_id`,
        {
          replacements: { center_id },
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
    getcontentValidationStatusByadmin,
    getcontentValidationStatus,
    getActiveDiscussions,
    validatecontent,
    getActiveWarnings,
    getcontentCenterToBeValidated,
    createCenter,
    deleteCenter
    
};