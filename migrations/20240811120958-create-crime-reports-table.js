'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Start a transaction
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('CrimeReports', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        applicant_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Applicants', // Assumes the Users table is already created
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        crime_type_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'CrimeTypes', // Assumes the CrimeTypes table is already created
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        report_date: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM('Pending', 'Investigating', 'Resolved', 'Closed'),
          defaultValue: 'Pending',
          allowNull: false,
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
      await queryInterface.addIndex('CrimeReports', ['applicant_id'], { transaction });
      await queryInterface.addIndex('CrimeReports', ['crime_type_id'], { transaction });
      await queryInterface.addIndex('CrimeReports', ['report_date'], { transaction });
      await queryInterface.addIndex('CrimeReports', ['status'], { transaction});
      // Commit the transaction
      await transaction.commit();
    } catch (error) {
      // Rollback the transaction in case of an error
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('CrimeReports', { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
