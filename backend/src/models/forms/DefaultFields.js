module.exports = (sequelize, DataTypes) => {
    const DefaultFields = sequelize.define('DefaultFields', {
        field_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        field_name: { type: DataTypes.STRING(60), allowNull: false },
        field_type: { type: DataTypes.STRING(255), allowNull: false },
        field_value: { type: DataTypes.TEXT, allowNull: false },
        max_value: { type: DataTypes.INTEGER },
        min_value: { type: DataTypes.INTEGER }
    }, {
        schema: 'forms',
        tableName: 'default_fields',
        timestamps: false
    });

    return DefaultFields;
};