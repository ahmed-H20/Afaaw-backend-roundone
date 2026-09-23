const { validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

module.exports = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map((error) => ({
            field: error.path,
            message: error.msg,
        }));

        return next(ApiError.badRequest("Validation failed", formattedErrors));
    }

    return next();
};
