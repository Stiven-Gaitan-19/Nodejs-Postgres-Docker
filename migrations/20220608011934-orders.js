'use strict';

let { orderSchema } = require('../models/order');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('orders', orderSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('orders');
  }
};
