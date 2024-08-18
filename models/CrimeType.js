const { Model, DataTypes } = require('sequelize');

class CrimeType extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,  // Ensures that each crime type name is unique
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,  // Optional field
      },
    }, {
      sequelize,
      tableName: 'CrimeTypes',
      underscored: true,  // Enable snake_case column names
      timestamps: true,  
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,  // Enables soft deletes by using the `deleted_at` column
      });
  }
}

module.exports = CrimeType;
