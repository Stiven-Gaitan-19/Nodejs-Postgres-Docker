const { ExtractJwt, Strategy } = require('passport-jwt');
require('dotenv').config();

const options = { 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:  process.env.JWT_SECRET_KEY,
}

module.exports = new Strategy(options, (payload, done)=>{
    return done(null, payload);
});