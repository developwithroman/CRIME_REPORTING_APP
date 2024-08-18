'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Start a transaction
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Create the Evidence table
      await queryInterface.createTable('Evidence', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        report_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'CrimeReports', // Assumes the CrimeReports table is already created
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        file_path: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        file_type: {
          type: Sequelize.ENUM('Document', 'Image', 'Video', 'Other'),
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
          allowNull: false,
        },
      }, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.dropTable('Evidence', { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
