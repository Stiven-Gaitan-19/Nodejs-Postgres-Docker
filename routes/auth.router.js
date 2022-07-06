const express = require('express');
const router = express.Router();
const passport = require('passport');
const localAuth = require('../libs/auth/passport');

passport.use(localAuth);

router.post('/login', passport.authenticate('local', {session: false}), async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
