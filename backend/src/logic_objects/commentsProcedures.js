const { sequelize } = require('../database');
const { QueryTypes } = require('index');

async function addComment({ parentCommentID = null, contentID, contentType, userID, commentText }) {
  const t = await sequelize.transaction();
  try {
    // Insert the new comment
    const [newComment] = await sequelize.query(
      `INSERT INTO "COMMUNICATION"."COMMENTS" ("FORUM_ID", "POST_ID", "PUBLISHER_ID", "COMMENT_DATE", "CONTENT")
       VALUES (
         CASE WHEN :contentType = 'Forum' THEN :contentID ELSE NULL END,
         CASE WHEN :contentType = 'Post' THEN :contentID ELSE NULL END,
         :userID, NOW(), :commentText
       ) RETURNING "COMMENT_ID"`,
      {
        replacements: { contentID, contentType, userID, commentText },
        type: QueryTypes.INSERT,
        transaction: t
      }
    );

    const newCommentID = newComment.COMMENT_ID;

    // Insert the path to the new comment (self-reference with depth 0)
    await sequelize.query(
      `INSERT INTO "COMMUNICATION"."COMMENT_PATH" ("ANCESTOR_ID", "DESCENDANT_ID", "DEPTH")
       VALUES (:newCommentID, :newCommentID, 0)`,
      {
        replacements: { newCommentID },
        type: QueryTypes.INSERT,
        transaction: t
      }
    );

    // If this is a reply to another comment, update the COMMENT_PATH table
    if (parentCommentID !== null) {
      // Insert paths for all ancestors of the parent comment to the new comment
      await sequelize.query(
        `INSERT INTO "COMMUNICATION"."COMMENT_PATH" ("ANCESTOR_ID", "DESCENDANT_ID", "DEPTH")
         SELECT "ANCESTOR_ID", :newCommentID, "DEPTH" + 1
         FROM "COMMUNICATION"."COMMENT_PATH"
         WHERE "DESCENDANT_ID" = :parentCommentID`,
        {
          replacements: { newCommentID, parentCommentID },
          type: QueryTypes.INSERT,
          transaction: t
        }
      );

      // Insert the direct link from parent to new comment
      await sequelize.query(
        `INSERT INTO "COMMUNICATION"."COMMENT_PATH" ("ANCESTOR_ID", "DESCENDANT_ID", "DEPTH")
         VALUES (:parentCommentID, :newCommentID, 1)`,
        {
          replacements: { parentCommentID, newCommentID },
          type: QueryTypes.INSERT,
          transaction: t
        }
      );
    }

    await t.commit();
  } catch (error) {
    await t.rollback();
    console.error('Error adding comment:', error);
    await sequelize.query(
      `EXEC "SECURITY"."LogError" :errorMessage`,
      {
        replacements: { errorMessage: error.message },
        type: QueryTypes.RAW
      }
    );
    throw error;
  }
}

async function getCommentTree(contentID, contentType) {
    try {
      const results = await sequelize.query(
        `WITH CommentHierarchy AS (
           SELECT 
               c."COMMENT_ID",
               c."FORUM_ID",
               c."POST_ID",
               c."PUBLISHER_ID",
               c."COMMENT_DATE",
               c."CONTENT",
               0 AS "Depth"
           FROM "COMMUNICATION"."COMMENTS" c
           WHERE 
               (:contentType = 'Post' AND c."POST_ID" = :contentID) OR
               (:contentType = 'Forum' AND c."FORUM_ID" = :contentID)
  
           UNION ALL
  
           SELECT 
               c."COMMENT_ID",
               c."FORUM_ID",
               c."POST_ID",
               c."PUBLISHER_ID",
               c."COMMENT_DATE",
               c."CONTENT",
               ch."Depth" + 1
           FROM "COMMUNICATION"."COMMENTS" c
           INNER JOIN "COMMUNICATION"."COMMENT_PATH" cp ON c."COMMENT_ID" = cp."DESCENDANT_ID"
           INNER JOIN CommentHierarchy ch ON cp."ANCESTOR_ID" = ch."COMMENT_ID"
           WHERE cp."DEPTH" > 0
         )
         SELECT 
             "COMMENT_ID",
             "FORUM_ID",
             "POST_ID",
             "PUBLISHER_ID",
             "COMMENT_DATE",
             "CONTENT",
             "Depth"
         FROM CommentHierarchy`,
        {
          replacements: { contentID, contentType },
          type: QueryTypes.SELECT
        }
      );
      return results;
    } catch (error) {
      console.error('Error fetching comment tree:', error);
      throw error;
    }
  }
module.exports = {
  addComment,
  getCommentTree
};
