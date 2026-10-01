class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // for production error , if true, then this is an operational error that we not need to log in production
  }
}

module.exports = ApiError;
