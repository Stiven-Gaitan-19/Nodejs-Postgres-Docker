const express = require('express');
const router = express.Router();
const passport = require('passport');
const localAuth = require('../libs/auth/passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

passport.use(localAuth);

router.post('/login', passport.authenticate('local', {session: false}), async (req, res, next) => {
  try {
    let { user } = req;
    const payload = {
      sub: user.id,
      role: user.role,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
    res.json({user, token});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
