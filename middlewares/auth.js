const Boom = require('@hapi/boom');

function checkPermissions (req, _res, next){
    let api = req.headers['api'];
    if(api !== 'my_password'){
        return next(Boom.unauthorized());
    }

    next();
}

function checkScopes(...roles){
    return function (req, res, next) {
        let { user } = req;
        if(roles.includes(user.role)){
            return next();
        }
        return next(Boom.forbidden());
    }
}

module.exports = {
    checkPermissions,
    checkScopes
}