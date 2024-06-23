const db = require('../../models'); 
const { QueryTypes } = require('sequelize');
//const { parse } = require('json2sql'); /


//to add more forms to a pendent event that is already created
async function addCustomFieldsToEventForm(eventID, customFieldsJson) {
  const t = await db.sequelize.transaction();
  try {
    // Check if the event is validated
    const event = await db.sequelize.query(
      `SELECT 1 FROM "DYNAMIC_CONTENT"."EVENTS" WHERE "EVENT_ID" = :eventID AND "VALIDATED" = 0`,
      {
        replacements: { eventID },
        type: QueryTypes.SELECT,
        transaction: t
      }
    );

    if (event.length === 0) {
      console.log('Event is already validated and cannot be edited.');
      await t.rollback();
      return;
    }

    // Convert JSON to array and insert custom fields
    const customFields = JSON.parse(customFieldsJson);

    for (const field of customFields) {
      await db.sequelize.query(
        `INSERT INTO "FORMS"."FIELDS" ("EVENT_ID", "FIELD_NAME", "FIELD_TYPE", "FIELD_VALUE", "MAX_VALUE", "MIN_VALUE")
         VALUES (:eventID, :fieldName, :fieldType, :fieldValue, :maxValue, :minValue)`,
        {
          replacements: {
            eventID,
            fieldName: field.FIELD_NAME,
            fieldType: field.FIELD_TYPE,
            fieldValue: field.FIELD_VALUE,
            maxValue: field.MAX_VALUE,
            minValue: field.MIN_VALUE
          },
          type: QueryTypes.INSERT,
          transaction: t
        }
      );
    }

    await t.commit();
  } catch (error) {
    await t.rollback();
    console.error('Error adding custom fields:', error);
    await db.sequelize.query(
      `EXEC "SECURITY"."LogError" :errorMessage`,
      {
        replacements: { errorMessage: error.message },
        type: QueryTypes.RAW
      }
    );
    throw error;
  }
}

async function createEventForm(eventID, customFieldsJson) {
    const t = await db.sequelize.transaction();
    try {
      // Copy default fields to the new event form
      await db.sequelize.query(
        `INSERT INTO "FORMS"."FIELDS" ("EVENT_ID", "FIELD_NAME", "FIELD_TYPE", "FIELD_VALUE", "MAX_VALUE", "MIN_VALUE", "DEF_FIELD_ID")
         SELECT :eventID, "FIELD_NAME", "FIELD_TYPE", "FIELD_VALUE", "MAX_VALUE", "MIN_VALUE", "FIELD_ID"
         FROM "FORMS"."DEFAULT_FIELDS"`,
        {
          replacements: { eventID },
          type: QueryTypes.INSERT,
          transaction: t
        }
      );
  
      // Convert JSON to array and insert custom fields
      const customFields = JSON.parse(customFieldsJson);
  
      for (const field of customFields) {
        await db.sequelize.query(
          `INSERT INTO "FORMS"."FIELDS" ("EVENT_ID", "FIELD_NAME", "FIELD_TYPE", "FIELD_VALUE", "MAX_VALUE", "MIN_VALUE")
           VALUES (:eventID, :fieldName, :fieldType, :fieldValue, :maxValue, :minValue)`,
          {
            replacements: {
              eventID,
              fieldName: field.FIELD_NAME,
              fieldType: field.FIELD_TYPE,
              fieldValue: field.FIELD_VALUE,
              maxValue: field.MAX_VALUE,
              minValue: field.MIN_VALUE
            },
            type: QueryTypes.INSERT,
            transaction: t
          }
        );
      }
  
      await t.commit();
    } catch (error) {
      await t.rollback();
      console.error('Error creating event form:', error);
      await db.sequelize.query(
        `EXEC "SECURITY"."LogError" :errorMessage`,
        {
          replacements: { errorMessage: error.message },
          type: QueryTypes.RAW
        }
      );
      throw error;
    }
}


async function editEventFormField(eventID, fieldID, { fieldName = null, fieldType = null, fieldValue = null, maxValue = null, minValue = null }) {
        const t = await db.sequelize.transaction();
        try {
          // Check if the event is validated
          const event = await db.sequelize.query(
            `SELECT 1 FROM "DYNAMIC_CONTENT"."EVENTS" WHERE "EVENT_ID" = :eventID AND "VALIDATED" = 0`,
            {
              replacements: { eventID },
              type: QueryTypes.SELECT,
              transaction: t
            }
          );
      
          if (event.length === 0) {
            console.log('Event is already validated and cannot be edited.');
            await t.rollback();
            return;
          }
      
          // Update the specified field for the event
          await db.sequelize.query(
            `UPDATE "FORMS"."FIELDS"
             SET
                 "FIELD_NAME" = COALESCE(:fieldName, "FIELD_NAME"),
                 "FIELD_TYPE" = COALESCE(:fieldType, "FIELD_TYPE"),
                 "FIELD_VALUE" = COALESCE(:fieldValue, "FIELD_VALUE"),
                 "MAX_VALUE" = COALESCE(:maxValue, "MAX_VALUE"),
                 "MIN_VALUE" = COALESCE(:minValue, "MIN_VALUE")
             WHERE "EVENT_ID" = :eventID AND "FIELD_ID" = :fieldID`,
            {
              replacements: { eventID, fieldID, fieldName, fieldType, fieldValue, maxValue, minValue },
              type: QueryTypes.UPDATE,
              transaction: t
            }
          );
      
          await t.commit();
        } catch (error) {
          await t.rollback();
          console.error('Error editing event form field:', error);
          await db.sequelize.query(
            `EXEC "SECURITY"."LogError" :errorMessage`,
            {
              replacements: { errorMessage: error.message },
              type: QueryTypes.RAW
            }
          );
          throw error;
        }
}
  
async function getFormSchema(eventID) {
    try {
      const formSchema = await db.sequelize.query(
        `SELECT "EVENT_ID", "FIELD_ID", "DEF_FIELD_ID", "FIELD_NAME", "FIELD_TYPE", "FIELD_VALUE", "MAX_VALUE", "MIN_VALUE"
         FROM "FORMS"."FIELDS"
         WHERE "EVENT_ID" = :eventID
         ORDER BY "FIELD_ID"`,
        {
          replacements: { eventID },
          type: QueryTypes.SELECT
        }
      );
      return formSchema;
    } catch (error) {
      console.error('Error fetching form schema:', error);
      throw error;
    }  
}
  
async function getFormSchemaAsJson(eventID) {
    try {
      const formSchema = await db.sequelize.query(
        `SELECT "EVENT_ID", "FIELD_ID", "DEF_FIELD_ID", "FIELD_NAME", "FIELD_TYPE", "FIELD_VALUE", "MAX_VALUE", "MIN_VALUE"
         FROM "FORMS"."FIELDS"
         WHERE "EVENT_ID" = :eventID
         ORDER BY "FIELD_ID"
         FOR JSON AUTO, ROOT('FormSchema')`,
        {
          replacements: { eventID },
          type: QueryTypes.RAW
        }
      );
      return formSchema[0][''];
    } catch (error) {
      console.error('Error fetching form schema as JSON:', error);
      throw error;
    }
}

async function insertFormAnswer(userID, eventID, fieldID, answer) {
    const t = await db.sequelize.transaction();
    try {
      await db.sequelize.query(
        `INSERT INTO "FORMS"."ANSWERS" ("USER_ID", "EVENT_ID", "FIELD_ID", "ANSWER", "ENTRY_DATE")
         VALUES (:userID, :eventID, :fieldID, :answer, NOW())`,
        {
          replacements: { userID, eventID, fieldID, answer },
          type: QueryTypes.INSERT,
          transaction: t
        }
      );
  
      await t.commit();
    } catch (error) {
      await t.rollback();
      console.error('Error inserting form answer:', error);
      await db.sequelize.query(
        `EXEC "SECURITY"."LogError" :errorMessage`,
        {
          replacements: { errorMessage: error.message },
          type: QueryTypes.RAW
        }
      );
      throw error;
    }
}

async function insertFormAnswers(userID, eventID, answersJson) {
    const t = await db.sequelize.transaction();
    try {
      // Convert JSON to array and insert answers
      const answers = JSON.parse(answersJson);
  
      for (const answer of answers) {
        await db.sequelize.query(
          `INSERT INTO "FORMS"."ANSWERS" ("USER_ID", "EVENT_ID", "FIELD_ID", "ANSWER", "ENTRY_DATE")
           VALUES (:userID, :eventID, :fieldID, :answer, NOW())`,
          {
            replacements: {
              userID,
              eventID,
              fieldID: answer.FIELD_ID,
              answer: answer.ANSWER
            },
            type: QueryTypes.INSERT,
            transaction: t
          }
        );
      }
  
      await t.commit();
    } catch (error) {
      await t.rollback();
      console.error('Error inserting multiple form answers:', error);
      await db.sequelize.query(
        `EXEC "SECURITY"."LogError" :errorMessage`,
        {
          replacements: { errorMessage: error.message },
          type: QueryTypes.RAW
        }
      );
      throw error;
    }
}


async function deleteEventFormField(eventID, fieldID) {
  const t = await db.sequelize.transaction();
  try {
      // Check if the event is validated
      const event = await db.sequelize.query(
          `SELECT 1 FROM "DYNAMIC_CONTENT"."EVENTS" WHERE "EVENT_ID" = :eventID AND "VALIDATED" = 0`,
          {
              replacements: { eventID },
              type: QueryTypes.SELECT,
              transaction: t
          }
      );

      if (event.length === 0) {
          console.log('Event is already validated and cannot be edited.');
          await t.rollback();
          return;
      }

      // Delete the specified field for the event
      await db.sequelize.query(
          `DELETE FROM "FORMS"."FIELDS" WHERE "EVENT_ID" = :eventID AND "FIELD_ID" = :fieldID`,
          {
              replacements: { eventID, fieldID },
              type: QueryTypes.DELETE,
              transaction: t
          }
      );

      await t.commit();
      console.log('Field deleted successfully.');
  } catch (error) {
      await t.rollback();
      console.error('Error deleting event form field:', error);
      await db.sequelize.query(
          `EXEC "SECURITY"."LogError" :errorMessage`,
          {
              replacements: { errorMessage: error.message },
              type: QueryTypes.RAW
          }
      );
      throw error;
  }
}

module.exports = {
  addCustomFieldsToEventForm,
  createEventForm,
  editEventFormField,
  getFormSchema,
  getFormSchemaAsJson,
  insertFormAnswer,
  insertFormAnswers,
  deleteEventFormField
};
