'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        allowNull: false,
        field: 'user_id'
      },
      sellerId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', field: 'id' },
        onUpdate: 'CASCADE',
        allowNull: false,
        field: 'seller_id'
      },
      totalPrice: {
        type: Sequelize.DECIMAL(9, 2),
        allowNull: false,
        field: 'total_price'
      },
      deliveryAddress: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: 'delivery_address'
      },
      deliveryNumber: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: 'delivery_number'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'sale_date',
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sales');
  }
};