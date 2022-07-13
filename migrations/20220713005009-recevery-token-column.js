'use strict';
let { userSchema } = require('../models/user');

module.exports = {
	async up(queryInterface, _Sequelize) {
		await queryInterface.addColumn('users', 'recovery_token', userSchema.recoveryToken);
	},

	async down(queryInterface, _Sequelize) {
		await queryInterface.removeColumn('users', 'recovery_token');
	},
};
