const { validationResult } = require('express-validator');

const validationMiddleware = (req, res, next) => {
	const error = validationResult(req);

	if (process.env.NODE_ENV === 'development') {
		console.log(error);
	}

	if (!error.isEmpty()) {
		return res.status(400).json({ errors: error.array() });
	}
	next();
};

module.exports = validationMiddleware;
