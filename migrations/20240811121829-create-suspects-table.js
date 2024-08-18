'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Start a transaction
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Create the Suspects table
      await queryInterface.createTable('Suspects', {
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
        name: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        social_media_id: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        social_profile_url: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        other_details: {
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
      await queryInterface.dropTable('Suspects', { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
