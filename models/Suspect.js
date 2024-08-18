const { Model, DataTypes } = require('sequelize');

class Suspect extends Model {
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
        name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        social_media_id: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        social_profile_url: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        other_details: {
          type: DataTypes.TEXT,
          allowNull: true,
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
        tableName: 'Suspects',
        modelName: 'Suspect',
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

module.exports = Suspect;
