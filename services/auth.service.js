const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const EmailBuilder = require('../libs/email/emailBuilder');
const UserService = require('../services/user.service');
const bcrypt = require('bcrypt');
require('dotenv').config();

const emailBuilder = new EmailBuilder();
const service = new UserService();

class AuthService {
	constructor() {}

	signToken(user, expires) {
		let options = {};
		const payload = {
			sub: user.id,
			role: user.role,
		};

		if (expires) {
			options.expiresIn = expires;
		}

		const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
		return { user, token };
	}

	async sendRecoveryEmail(email) {
		try {
			let user = await service.findByEmail(email);
			let token = this.signToken(user, '15min').token;

			await service.update(user.id, { recoveryToken: token });

			let emailSender = emailBuilder
				.setTo(email)
				.setSubject('Password Recovery')
				.setText('For Recover your password clic here => ' + token)
				.build();

			await emailSender.sendEmail();
		} catch (error) {
			if (error.isBoom) {
				if (error.output.payload.error === 'Not Found') {
					throw boom.unauthorized();
				}
			}

			throw error;
		}
	}

	async changePassword(token, newPassword) {
		try {
			let payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
			let user = await service.findOne(payload.sub);
			if (user.recoveryToken !== token) {
				throw boom.unauthorized();
			}
			let parsswordCrypted = await bcrypt.hash(newPassword, 10);
			await service.update(user.id, { password: parsswordCrypted, recoveryToken: null });
		} catch (error) {
			if (error.isBoom) {
				if (error.output.payload.error === 'Not Found') {
					throw boom.unauthorized();
				}
			} else if (error.message === 'jwt expired' || error.message === 'invalid signature') {
				throw boom.unauthorized();
			}

			throw error;
		}
	}
}

module.exports = AuthService;
