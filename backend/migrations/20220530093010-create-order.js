'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        }
      },
      is_paid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      paid_at: {
        type: Sequelize.DATE
      },
      is_delivered: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      delivered_at: {
        type: Sequelize.DATE
      },
      order_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      order_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      order_phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      order_city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};