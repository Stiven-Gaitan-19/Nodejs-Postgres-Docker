'use strict';

let { customerSchema } = require('../models/customer');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable('customers', customerSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable('customers');
  }
};
