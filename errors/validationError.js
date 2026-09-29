const AppError = require("./appError");


class validationError extends AppError {
    constructor(message, statusCode, errors) {
        super(message, statusCode);
        this.errors = errors;
    }
}

module.exports = validationError;