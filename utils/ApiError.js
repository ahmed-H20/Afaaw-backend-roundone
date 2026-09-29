const { FAIL, ERROR } = require("../constants/httpStatusText");

class ApiError extends Error {
  constructor(statusCode, message, statusText, errors = null) {
    super(message);

    this.statusCode = statusCode;
    this.errors = errors;
    this.statusText =
      statusText || (statusCode >= 400 && statusCode < 500 ? FAIL : ERROR);
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
