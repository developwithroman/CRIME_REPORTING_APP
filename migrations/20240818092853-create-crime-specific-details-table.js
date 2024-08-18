'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('CrimeSpecificDetails', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        report_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'CrimeReports',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        crime_type_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'CrimeTypes',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        detail_key_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'CrimeFields',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        detail_key: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        detail_value: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          allowNull: false,
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      }, {transaction});
      await queryInterface.addIndex('CrimeSpecificDetails', ['report_id', 'crime_type_id', 'detail_key'], {unique: true, transaction});
      await transaction.commit();
    } catch (error) {
      console.error(error);
      await transaction.rollback();
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeIndex('CrimeSpecificDetails', ['report_id', 'crime_type_id', 'detail_key'], {transaction});
      await queryInterface.dropTable('CrimeSpecificDetails', {transaction});
      await transaction.commit();
    } catch (error) {
      console.error(error);
      await transaction.rollback();
    }
  }
};
