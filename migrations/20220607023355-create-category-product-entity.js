'use strict';

let { categorySchema } = require('../models/category');
let { productSchema } = require('../models/product');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('categories', categorySchema);
    await queryInterface.createTable('products', productSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('categories');
    await queryInterface.dropTable('products');
  }
};
