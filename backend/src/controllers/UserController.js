const UserModel = require('../models/hr_users');
const sequelize = require('../models/db');
const controllers = {};

sequelize.sync();
/************************************************************************************************************************
 * Endpoint: User Login                                                                                                 *
 * @method: POST                                                                                                        *   
 * URL: /user/login                                                                                                     *
 * @description: Authenticates a user by matching the provided email and password with a record in the database.        *
 * @param:                                                                                                              *
 *   - USER_EMAIL (string): The email address of the user attempting to log in.                                         *
 *   - USER_PASSWORD (string): The password for the user.                                                               *
 * Request Body Example:                                                                                                *
 * {                                                                                                                    *
 *   "USER_EMAIL": "user@example.com",                                                                                  *
 *   "USER_PASSWORD": "password123"                                                                                     *
 * }                                                                                                                    *
 * Response:                                                                                                            *
 *   - Success:                                                                                                         *
 *     - HTTP Status: 200                                                                                               *
 *     - Content: {{"success": true,"message": "User found",                                                            *
 *   "data": {                                                                                                          *
 *       "USER_ID": 1,                                                                                                  *
 *       "EMAIL": "user@example.com",                                                                                   *
 *       "PROFILE_PIC": "pic22.png",                                                                                    *
 *       "RoleID": 2,                                                                                                   *
 *       "JOIN_DATE": "2024-02-02T00:00:00.000Z",                                                                       *
 *       "NAME": "teste2",                                                                                              *
 *       "LAST_ACCESS": "2024-02-02T00:00:00.000Z"                                                                      *
    }                                                                                                                   *
}                                                                                                                       *
 *   - Failure:                                                                                                         *
 *     - Content: {"success": false,"message": "User not found"}                                                        *
 ***********************************************************************************************************************/

controllers.login = async (req, res) => {
    const { USER_EMAIL, USER_PASSWORD } = req.body;
    const user = await UserModel.findOne({
        where: { EMAIL: USER_EMAIL, PASSWORD: USER_PASSWORD },
    });

    if (user) {
        delete user.dataValues.PASSWORD;

        res.json({ success: true, message: 'User found', data: user });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
};

/*********************************************************************************************************************************************
 * Endpoint: List All Users                                                                                                                  *
 * @method: GET                                                                                                                              *
 * URL: /users/list                                                                                                                          *
 * @description: Retrieves a list of all users from the database. Sensitive information like passwords is removed from the response.         *
 * @param:                                                                                                                                   *
 *   - None (This endpoint does not require any parameters.)                                                                                 *
 * Response:                                                                                                                                 *
 *   - Success:                                                                                                                              *
 *     - HTTP Status: 200                                                                                                                    *
 *     - Content: [{ ...userData, excluding sensitive fields }]                                                                              *
 *   - Error:                                                                                                                                *
 *     - HTTP Status: 500 (if there's a server error)                                                                                        *
 *     - Content: { success: false, message: 'An error occurred while retrieving users' }                                                    *
 * Notes:                                                                                                                                    *
 *   - Sensitive fields such as passwords are removed from the response to maintain security and privacy.                                    *
 *********************************************************************************************************************************************/

controllers.list = async (req, res) => {
    try {
        const users = await UserModel.findAll();

        const sanitizedUsers = users.map((user) => {
            const userCopy = { ...user.dataValues };
            delete userCopy.PASSWORD; 
            delete userCopy.sensitiveField; 
            return userCopy;
        });

        res.json(sanitizedUsers);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving users',
        });
    }
};

/******************************************************************************************************************************************************************************
 * Endpoint: Register a New User                                                                                                                                              *
 * @method: POST                                                                                                                                                              *
 * URL: /user/register                                                                                                                                                        *
 * @description: Registers a new user in the database, creating a new record with the provided details. Sensitive information like passwords is not returned in the response. *
 * @param:                                                                                                                                                                    *       
 *   - email (string): The email address of the new user.                                                                                                                     *
 *   - password (string): The password for the new user (not returned in the response).                                                                                       *
 *   - profile_pic (string): URL or path to the user's profile picture.                                                                                                       *
 *   - roleid (number): The role ID indicating the user's role.                                                                                                               *
 *   - join_date (string): The date when the user joined.                                                                                                                     *
 *   - name (string): The name of the user.                                                                                                                                   *
 *   - last_access (string): The last access time or date.                                                                                                                    *
 * Request Body Example:                                                                                                                                                      *
 * {                                                                                                                                                                          *
 *   "email": "user@example.com",                                                                                                                                             *
 *   "password": "securePassword",                                                                                                                                            *
 *   "profile_pic": "https://example.com/profile.jpg",                                                                                                                        *
 *   "roleid": 1,                                                                                                                                                             *
 *   "join_date": "2024-01-01",                                                                                                                                               *
 *   "name": "John Doe",                                                                                                                                                      *
 *   "last_access": "2024-01-02"                                                                                                                                              *
 * }                                                                                                                                                                          *
 * Response:                                                                                                                                                                  *
 *   - Success:                                                                                                                                                               *
 *     - HTTP Status: 201 (indicates a successful user registration)                                                                                                          *
 *     - Content: { success: true, message: 'User registered successfully', data: { ...userDetails, excluding sensitive fields } }                                            *
 *   - Failure:                                                                                                                                                               *
 *     - HTTP Status: 500 (if server error occurs)                                                                                                                            *
 *     - Content: { success: false, message: 'An error occurred during registration', error: string }                                                                         *
 * Notes:                                                                                                                                                                     *
 *   - Passwords and other sensitive information are not returned in the response for security reasons.                                                                       *
 *   - Error handling is implemented to catch and handle any exceptions during user registration.                                                                             *
 *****************************************************************************************************************************************************************************/

controllers.register = async (req, res) => {
    const {
        email,
        password,
        profile_pic,
        roleid,
        join_date,
        name,
        last_access
    } = req.body;

    console.log(email, password, profile_pic, roleid, join_date, name, last_access);

    try {
        const newUser = await UserModel.create({
            EMAIL: email,
            PASSWORD: password,
            PROFILE_PIC: profile_pic,
            RoleID: roleid,
            JOIN_DATE: join_date,
            NAME: name,
            LAST_ACCESS: last_access
        });

        delete newUser.dataValues.PASSWORD;

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: newUser,
        });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during registration',
            error: error.message,
        });
    }
};



module.exports = controllers;