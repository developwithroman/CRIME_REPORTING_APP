const { Model, DataTypes } = require('sequelize');

class CrimeSpecificDetail extends Model {
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
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        crime_type_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'CrimeTypes',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        detail_key_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'CrimeFields',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        detail_key: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        detail_value: {
          type: DataTypes.TEXT,
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
        deleted_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'CrimeSpecificDetails',
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

    this.belongsTo(models.CrimeType, {
      foreignKey: 'crime_type_id',
      as: 'crimeType',
      onDelete: 'CASCADE',
    });

    this.belongsTo(models.CrimeField, {
      foreignKey: 'detail_key_id',
      as: 'crimeField',
      onDelete: 'CASCADE',
    });
  }
}

module.exports = CrimeSpecificDetail;
