'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('CrimeFields', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
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
        field_key: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        field_label: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        field_type: {
          type: Sequelize.ENUM('text', 'textarea', 'select', 'radio', 'checkbox', 'file'),
          allowNull: false,
        },
        field_options: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        is_required: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
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
      await queryInterface.addIndex('CrimeFields', ['crime_type_id', 'field_key'], {unique: true, transaction});
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('CrimeFields', {transaction});
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
