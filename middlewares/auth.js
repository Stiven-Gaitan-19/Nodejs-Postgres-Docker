const Boom = require('@hapi/boom');

module.exports = function checkPermissions (req, _res, next){
    let api = req.headers['api'];
    if(api !== 'my_password'){
        return next(Boom.unauthorized());
    }

    next();
}