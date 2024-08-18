const { Model, DataTypes } = require("sequelize");

class CrimeReport extends Model {
  static init(sequelize) {
    super.init(
      {
        applicant_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "Users", // Name of the Users table
            key: "id",
          },
          onDelete: "CASCADE",
        },
        crime_type_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "CrimeTypes", // Name of the CrimeTypes table
            key: "id",
          },
          onDelete: "CASCADE",
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        report_date: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM(
            "Pending",
            "Investigating",
            "Resolved",
            "Closed"
          ),
          defaultValue: "Pending",
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.literal(
            "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
          ),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "CrimeReports",
        timestamps: true,
        paranoid: true,
        underscored: true,
        modelName: "CrimeReport",
      }
    );
  }

  static associate(models) {
    // Associations can be defined here
    this.belongsTo(models.User, {
      foreignKey: "applicant_id",
      as: "Applicant",
    });
    this.belongsTo(models.CrimeType, {
      foreignKey: "crime_type_id",
      as: "CrimeType",
    });
    this.hasMany(models.Suspect, { foreignKey: "report_id", as: "Suspects" });
    this.hasMany(models.Evidence, { foreignKey: "report_id", as: "Evidences" });
    this.hasMany(models.ActionLog, {
      foreignKey: "report_id",
      as: "ActionLogs",
    });
    this.hasMany(models.CrimeSpecificDetail, {
      foreignKey: "report_id",
      as: "SpecificDetails",
    });
  }
}

module.exports = CrimeReport;
