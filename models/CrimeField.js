const { Model, DataTypes } = require('sequelize');

class CrimeField extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
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
        field_key: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        field_label: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        field_type: {
          type: DataTypes.ENUM('text', 'textarea', 'select', 'radio', 'checkbox', 'file'),
          allowNull: false,
        },
        field_options: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        is_required: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
        deleted_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'CrimeFields',
        paranoid: true, // Enables soft deletes using the `deleted_at` field
        timestamps: true, // Enables automatic handling of `created_at` and `updated_at`
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.CrimeType, {
      foreignKey: 'crime_type_id',
      as: 'crimeType',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  }
}

module.exports = CrimeField;
