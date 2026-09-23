const sendErrorDev = (err, res) => {
	res.status(err.statusCode || 500).json({
		message: err.message || 'Internal Server Error',
		stack: err.stack,
		status: err.status || 'error',
		err,
	});
};

const sendErrorProd = (err, res) => {
	res.status(err.statusCode || 500).json({
		message: err.message || 'Internal Server Error',
		status: err.status || 'error',
	});
};

const globalError = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';
	if (process.env.NODE_ENV === 'development') {
		sendErrorDev(err, res);
	} else {
		sendErrorProd(err, res);
	}
};

module.exports = globalError;
