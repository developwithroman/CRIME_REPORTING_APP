const { Model, DataTypes } = require('sequelize');

class Evidence extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        report_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'CrimeReports',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        file_path: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        file_type: {
          type: DataTypes.ENUM('Document', 'Image', 'Video', 'Other'),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        upload_date: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
          allowNull: false,
        },
        deleted_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'Evidence',
        paranoid: true, // Enables soft deletes using the `deleted_at` field
        timestamps: true, // Manages `created_at` and `updated_at`
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.CrimeReport, {
      foreignKey: 'report_id',
      as: 'crimeReport',
      onDelete: 'CASCADE',
    });
  }
}

module.exports = Evidence;
