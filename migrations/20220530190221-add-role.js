'use strict';

let { userSchema } = require('../models/user');

module.exports = {
  async up(queryInterface) {
    queryInterface.addColumn('users', 'role', userSchema.role);
  },

  async down(queryInterface) {
    queryInterface.removeColumn('users', 'role');
  },
};
