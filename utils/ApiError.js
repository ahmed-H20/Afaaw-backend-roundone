//  client errors -> fail
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    // this.isOperational = true; //if true, it means the error is operational and we dont need to log in production
  }
}

module.exports = ApiError;
