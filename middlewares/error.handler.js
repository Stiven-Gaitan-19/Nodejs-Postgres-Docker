const boom = require('@hapi/boom');

function logErrors(err, req, res, next) {
	console.error(err);
	next(err);
}

function errorHandler(err, req, res, _next) {
	res.status(500).json({
		message: err.message,
		stack: err.stack,
	});
}

function boomErrorHandler(err, req, res, _next) {
	if (!err.isBoom) {
		console.error(err);
		err = boom.internal();
	}
	const { output } = err;
	res.status(output.statusCode).json(output.payload);
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
