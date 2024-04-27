const PermissionModel = require('../models/security_permissions');
const sequelize = require('../models/db');
const controllers = {};

sequelize.sync();


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


module.exports = controllers;