const PermissionModel = require('../models/security_permissions');
const sequelize = require('../models/db');
const controllers = {};

sequelize.sync();
/*******************************************************
 * Endpoint: Add a New Permission
 * @method: POST
 * URL: /permission/add
 * @description Adds a new permission to the database. 
 * 
 * 
 *   @param RoleName (string): The name of the role for the permission.
 *   @param RoleLevel (number): The level of the role, typically an integer indicating the role's authority.
 * 
 * Request Body Example:
 * {
 *  "RoleName": "User1",
 *  "RoleLevel": 1
 * }
 * 
 * Response:
 *   - Success: 
 *     - HTTP Status: 200
 *     - Content: {"success": true, "data": {"RoleID": 2,"RoleName": "User","RoleLevel": 1}}
 *   - Failure:
 *     - Content: {"success": false,"data": {"message": "RoleName already exists in the database"}}
 *******************************************************/

controllers.add = async (req, res) => {

    try {
        const { RoleName, RoleLevel } = req.body;

        const existingRole = await PermissionModel.findOne({
            where: { RoleName },
        });

        if (existingRole) {
            return res.status(400).json({
                success: false,
                data: { message: 'RoleName already exists in the database' },
            });
        }

        const newPermission = await PermissionModel.create({
            RoleName,
            RoleLevel,
        });

        res.status(201).json({
            success: true,
            data: newPermission,
        });
    } catch (error) {
        console.error('Error adding permission:', error);
        res.status(500).json({
            success: false,
            data: { message: 'An error occurred while adding the permission' },
        });
    }


};
/***********************************************************************************************************************
 * Endpoint: List All Permissions                                                                                      *
 * @method: GET                                                                                                        *                                   
 * @description: Retrieves a list of all permissions from the database.                                                *
 * @param:                                                                                                             *
 *   - None (This endpoint does not require any parameters.)                                                           *
 * Response:                                                                                                           *                
 *   - Success:                                                                                                        *
 *     - HTTP Status: 200                                                                                              *
 *     - Content: [{RoleID": 2,"RoleName": "User2","RoleLevel": 1},{"RoleID": 3,"RoleName": "User1","RoleLevel": 1}]   *
 **********************************************************************************************************************/

controllers.list = async (req, res) => {
    const data = await PermissionModel.findAll();
    res.json(data);
}

// controllers.remove = async (req, res) => {
//     try {
//         const id = req.body.id;

//         const record = await PermissionModel.findOne({
//             where: { RoleID: id },
//         });

//         if (record) {
//             await record.destroy();
//             res.json({ success: true, data: { message: 'Record removed successfully' } });
//         } else {
//             res.status(404).json({ success: false, data: { message: 'Record does not exist' } });
//         }
//     } catch (error) {
//         console.error('Error removing record:', error);
//         res.status(500).json({ success: false, data: { message: 'An error occurred while removing the record' } });
//     }
// };


module.exports = controllers;