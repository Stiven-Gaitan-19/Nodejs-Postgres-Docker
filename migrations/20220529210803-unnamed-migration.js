'use strict';

let { userSchema } = require('../models/user');
let { customerSchema } = require('../models/customer');
let { categorySchema } = require('../models/category');
let { productSchema } = require('../models/product');
const {  DataTypes, NOW } = require('sequelize');
let { orderProductSchema } = require('../models/order-product');

module.exports = {
  async up(queryInterface) {

    await queryInterface.createTable('users', userSchema);
    await queryInterface.createTable('customers', customerSchema);
    await queryInterface.createTable('categories', categorySchema);
    await queryInterface.createTable('products', productSchema);
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: NOW,
      },
      customerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'customer_id',
        references: { model: 'customers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    });
    await queryInterface.createTable('orders_products', orderProductSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('customers');
    await queryInterface.dropTable('categories');
    await queryInterface.dropTable('products');
    await queryInterface.dropTable('orders');
    await queryInterface.dropTable('orders_products')
  },
};
