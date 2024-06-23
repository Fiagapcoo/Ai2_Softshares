const { QueryTypes } = require('sequelize');
const db = require('../../models'); 

async function logUserAction(userID, type, description) {
    try {
      await db.sequelize.transaction(async (transaction) => {
        await db.sequelize.query(
          `INSERT INTO "USER_INTERACTIONS"."USER_ACTIONS_LOG" (USER_ID, ACTION_TYPE, ACTION_DESCRIPTION) VALUES (:userID, :type, :description)`,
          {
            replacements: { userID, type, description },
            type: QueryTypes.INSERT,
            transaction
          }
        );
      });
    } catch (error) {
      console.error('Error logging user action:', error);
      throw error;
    }
}

async function getUserPreferences(userID) {
    try {
      const results = await db.sequelize.query(
        `SELECT 
            up.USER_ID, 
            up.AREAS, 
            up.SUB_AREAS, 
            a.TITLE AS "AreaTitle", 
            sa.TITLE AS "SubAreaTitle", 
            up."ReceiveNotifications"
          FROM "USER_INTERACTIONS"."USER_PREF" up
          LEFT JOIN "STATIC_CONTENT"."AREA" a ON up.AREAS IS NOT NULL AND EXISTS (
              SELECT 1 
              FROM OPENJSON(up.AREAS) 
              WHERE value = CAST(a."AREA_ID" AS NVARCHAR)
          )
          LEFT JOIN "STATIC_CONTENT"."SUB_AREA" sa ON up.SUB_AREAS IS NOT NULL AND EXISTS (
              SELECT 1 
              FROM OPENJSON(up.SUB_AREAS) 
              WHERE value = CAST(sa."SUB_AREA_ID" AS NVARCHAR)
          )
          WHERE up.USER_ID = :userID`,
        {
          replacements: { userID },
          type: QueryTypes.SELECT
        }
      );
      return results;
    } catch (error) {
      console.error('Error fetching user preferences:', error);
      throw error;
    }
}

  async function updateUserPreferences(userID, preferredLanguageID, preferredAreas, preferredSubAreas, receiveNotifications) {
    try {
      await db.sequelize.transaction(async (transaction) => {
        if (preferredLanguageID !== null) {
          await db.sequelize.query(
            `UPDATE "USER_INTERACTIONS"."USER_PREF"
            SET "LanguageID" = :preferredLanguageID
            WHERE "USER_ID" = :userID`,
            {
              replacements: { userID, preferredLanguageID },
              type: QueryTypes.UPDATE,
              transaction
            }
          );
        }
  
        if (preferredAreas !== null) {
          await db.sequelize.query(
            `UPDATE "USER_INTERACTIONS"."USER_PREF"
            SET "AREAS" = :preferredAreas
            WHERE "USER_ID" = :userID`,
            {
              replacements: { userID, preferredAreas },
              type: QueryTypes.UPDATE,
              transaction
            }
          );
        }
  
        if (preferredSubAreas !== null) {
          await db.sequelize.query(
            `UPDATE "USER_INTERACTIONS"."USER_PREF"
            SET "SUB_AREAS" = :preferredSubAreas
            WHERE "USER_ID" = :userID`,
            {
              replacements: { userID, preferredSubAreas },
              type: QueryTypes.UPDATE,
              transaction
            }
          );
        }
  
        if (receiveNotifications !== null) {
          await db.sequelize.query(
            `UPDATE "USER_INTERACTIONS"."USER_PREF"
            SET "ReceiveNotifications" = :receiveNotifications
            WHERE "USER_ID" = :userID`,
            {
              replacements: { userID, receiveNotifications },
              type: QueryTypes.UPDATE,
              transaction
            }
          );
        }
  
        await logUserAction(userID, 'Updated User Preferences', 'User changed preferences');
      });
    } catch (error) {
      console.error('Error updating user preferences:', error);
      throw error;
    }
}

async function updateAccessOnLogin(userID) {
    try {
      await db.sequelize.transaction(async (transaction) => {
        await db.sequelize.query(
          `UPDATE "HR"."USERS"
          SET "LAST_ACCESS" = NOW()
          WHERE "USER_ID" = :userID`,
          {
            replacements: { userID },
            type: QueryTypes.UPDATE,
            transaction
          }
        );
  
        await logUserAction(userID, 'Login', 'User logged into the application');
      });
    } catch (error) {
      console.error('Error updating last access on login:', error);
      throw error;
    }
}

async function getUserRole(userID) {
    try {
      const result = await db.sequelize.query(
        `SELECT p."RoleName"
        FROM "HR"."USERS" u
        JOIN "SECURITY"."ACC_PERMISSIONS" p ON u."RoleID" = p."RoleID"
        WHERE u."USER_ID" = :userID`,
        {
          replacements: { userID },
          type: QueryTypes.SELECT
        }
      );
      return result[0] ? result[0].RoleName : null;
    } catch (error) {
      console.error('Error getting user role:', error);
      throw error;
    }
}

async function addBookmark(userID, contentID, contentType) {
    try {
      await db.sequelize.transaction(async (transaction) => {
        const [results] = await db.sequelize.query(
          `SELECT 1 FROM "USER_INTERACTIONS"."BOOKMARKS"
          WHERE "USER_ID" = :userID AND "CONTENT_ID" = :contentID AND "CONTENT_TYPE" = :contentType`,
          {
            replacements: { userID, contentID, contentType },
            type: QueryTypes.SELECT,
            transaction
          }
        );
  
        if (!results) {
          await db.sequelize.query(
            `INSERT INTO "USER_INTERACTIONS"."BOOKMARKS" ("USER_ID", "CONTENT_ID", "CONTENT_TYPE", "BOOKMARK_DATE")
            VALUES (:userID, :contentID, :contentType, NOW())`,
            {
              replacements: { userID, contentID, contentType },
              type: QueryTypes.INSERT,
              transaction
            }
          );
  
          await logUserAction(userID, 'Bookmark', 'User added bookmark');
        } else {
          console.log('Content already bookmarked.');
        }
      });
    } catch (error) {
      console.error('Error adding bookmark:', error);
      throw error;
    }
}

async function removeBookmark(userID, contentID, contentType) {
    try {
      await db.sequelize.transaction(async (transaction) => {
        const [results] = await db.sequelize.query(
          `SELECT 1 FROM "USER_INTERACTIONS"."BOOKMARKS"
          WHERE "USER_ID" = :userID AND "CONTENT_ID" = :contentID AND "CONTENT_TYPE" = :contentType`,
          {
            replacements: { userID, contentID, contentType },
            type: QueryTypes.SELECT,
            transaction
          }
        );
  
        if (results) {
          await db.sequelize.query(
            `DELETE FROM "USER_INTERACTIONS"."BOOKMARKS"
            WHERE "USER_ID" = :userID AND "CONTENT_ID" = :contentID AND "CONTENT_TYPE" = :contentType`,
            {
              replacements: { userID, contentID, contentType },
              type: QueryTypes.DELETE,
              transaction
            }
          );
  
          await logUserAction(userID, 'Bookmark', 'User removed bookmark');
          console.log('Bookmark removed successfully.');
        } else {
          console.log('Bookmark does not exist.');
        }
      });
    } catch (error) {
      console.error('Error removing bookmark:', error);
      throw error;
    }
}

async function getUserBookmarks(userID) {
    try {
      const results = await db.sequelize.query(
        `SELECT 
          ub."USER_ID",
          ub."CONTENT_ID",
          ub."CONTENT_TYPE",
          ub."BOOKMARK_DATE",
          p."TITLE" AS "PostTitle",
          p."CONTENT" AS "PostContent",
          e."NAME" AS "EventName",
          e."DESCRIPTION" AS "EventDescription",
          f."TITLE" AS "ForumTitle",
          f."CONTENT" AS "ForumContent"
        FROM "USER_INTERACTIONS"."BOOKMARKS" ub
        LEFT JOIN "DYNAMIC_CONTENT"."POSTS" p ON ub."CONTENT_ID" = p."POST_ID" AND ub."CONTENT_TYPE" = 'Post'
        LEFT JOIN "DYNAMIC_CONTENT"."EVENTS" e ON ub."CONTENT_ID" = e."EVENT_ID" AND ub."CONTENT_TYPE" = 'Event'
        LEFT JOIN "DYNAMIC_CONTENT"."FORUMS" f ON ub."CONTENT_ID" = f."FORUM_ID" AND ub."CONTENT_TYPE" = 'Forum'
        WHERE ub."USER_ID" = :userID`,
        {
          replacements: { userID },
          type: QueryTypes.SELECT
        }
      );
      return results;
    } catch (error) {
      console.error('Error fetching user bookmarks:', error);
      throw error;
    }
}
  
  module.exports = {
    logUserAction,
    getUserPreferences,
    updateUserPreferences,
    updateAccessOnLogin,
    getUserRole,
    addBookmark,   
    removeBookmark, 
    getUserBookmarks,
}