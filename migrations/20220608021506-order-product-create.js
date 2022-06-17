'use strict';

let { orderProductSchema } = require('../models/order-product');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('orders_products', orderProductSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('orders_products');
  }
};
