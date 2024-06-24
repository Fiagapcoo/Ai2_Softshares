const bcrypt = require('bcrypt');
const saltRounds = 10;

// Function to hash a password
async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (err) {
        throw new Error('Error hashing password: ' + err.message);
    }
}

// Function to verify a password
async function verifyPassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (err) {
        throw new Error('Error verifying password: ' + err.message);
    }
}

// Export the functions for use in other files
module.exports = {
    hashPassword,
    verifyPassword
};
