const { Model, DataTypes } = require('sequelize');

class Applicant extends Model {
  static init(sequelize) {
    super.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          phone: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          official_id: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          id_type: {
            type: DataTypes.ENUM('Individual', 'Organization', 'Government'),
            allowNull: false,
          },
          organization_type: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          department: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          address: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          created_at: {
            type: DataTypes.TIMESTAMP,
            defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
          },
          updated_at: {
            type: DataTypes.TIMESTAMP,
            defaultValue: DataTypes.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            allowNull: false,
          },
          deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
          },
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      underscored: true,  // Enable snake_case column names
      paranoid: true,  // Enables soft deletes by using the `deleted_at` column
      timestamps: false,  // Since `created_at` and `updated_at` are manually managed
    });
  }
}

module.exports = Applicant;
