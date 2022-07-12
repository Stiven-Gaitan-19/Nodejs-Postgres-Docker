const express = require('express');
const router = express.Router();
const passport = require('passport');
const localAuth = require('../libs/auth/passport');
const AuthService = require('../services/auth.service');
const authService = new AuthService();

passport.use(localAuth);

router.post('/login', passport.authenticate('local', { session: false }), async (req, res, next) => {
	try {
		let { user } = req;
		res.json(authService.signToken(user));
	} catch (error) {
		next(error);
	}
});

router.post('/recovery', async (req, res, next) => {
	try {
		let { email } = req.body;
		await authService.sendRecoveryEmail(email);
		res.send().json({ message: 'message sent' });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
