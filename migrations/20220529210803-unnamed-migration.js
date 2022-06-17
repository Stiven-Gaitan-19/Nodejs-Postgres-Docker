'use strict';

let { userSchema } = require('../models/user');
let { customerSchema } = require('../models/customer');
let { categorySchema } = require('../models/category');
let { productSchema } = require('../models/product');
let { orderSchema } = require('../models/order');
let { orderProductSchema } = require('../models/order-product');

module.exports = {
  async up(queryInterface) {

    await queryInterface.createTable('users', userSchema);
    await queryInterface.createTable('customers', customerSchema);
    await queryInterface.createTable('categories', categorySchema);
    await queryInterface.createTable('products', productSchema);
    await queryInterface.createTable('orders', orderSchema);
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
