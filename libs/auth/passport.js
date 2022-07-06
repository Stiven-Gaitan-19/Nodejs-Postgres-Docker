const { Strategy } = require('passport-local');
const UserService = require('../../services/user.service');
const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const service = new UserService();

module.exports = new Strategy(async (username, password, done) => {
    let user;
	try {
		user = await service.findByEmail(username);
	} catch (err) {
		return done(Boom.unauthorized(), false);
	}
	let isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		return done(Boom.unauthorized(), false);
	}
	delete user.dataValues.password;
	done(null, user);
});
