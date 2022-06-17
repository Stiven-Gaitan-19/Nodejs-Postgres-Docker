'use strict';

let { userSchema } = require('../models/user');

module.exports = {
  async up(queryInterface) {
    queryInterface.createTable('users', userSchema);
  },

  async down(queryInterface) {
    queryInterface.dropTable('users');
  },
};
