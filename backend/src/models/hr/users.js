module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        employee_id: { type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },
        first_name: { type: DataTypes.STRING(30), allowNull: false },
        last_name: { type: DataTypes.STRING(30), allowNull: false },
        email: { type: DataTypes.STRING(100), allowNull: false },
        hashed_password: { type: DataTypes.STRING(255) },
        profile_pic: { type: DataTypes.TEXT },
        role_id: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
        join_date: { type: DataTypes.DATE, allowNull: false },
        last_access: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, {
        schema: 'hr',
        tableName: 'users',
        timestamps: false
    });

    Users.associate = function(models) {
        Users.belongsTo(models.AccPermissions, { foreignKey: 'role_id' });
    };

    return Users;
};
