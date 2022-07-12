const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const EmailBuilder = require('../libs/email/emailBuilder');
const UserService = require('../services/user.service');
require('dotenv').config();

const emailBuilder = new EmailBuilder();
const service = new UserService();

class AuthService {
	constructor() {}

	signToken(user) {
		const payload = {
			sub: user.id,
			role: user.role,
		};
		const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
		return { user, token };
	}

	async sendRecoveryEmail(email) {
		try {
			await service.findByEmail(email);
		} catch (error) {
			if (error.isBoom) {
				if (error.output.payload.error === 'Not Found') {
					throw boom.unauthorized();
				}
			}

			throw boom.internal();
		}

		let emailSender = emailBuilder
			.setTo(email)
			.setSubject('Password Recovery')
			.setText('You just asked for recovery your password')
			.build();

		await emailSender.sendEmail();
	}
}

module.exports = AuthService;
