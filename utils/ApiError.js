class ApiError extends Error {
  constructor(message, statusCode, details = undefined) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(msg = "Bad request", details) {
    return new ApiError(msg, 400, details);
  }
  static unauthorized(msg = "Unauthorized") {
    return new ApiError(msg, 401);
  }
  static forbidden(msg = "Forbidden") {
    return new ApiError(msg, 403);
  }
  static notFound(msg = "Not found") {
    return new ApiError(msg, 404);
  }
  static conflict(msg = "Conflict") {
    return new ApiError(msg, 409);
  }
  static internal(msg = "Internal server error") {
    return new ApiError(msg, 500);
  }
}

module.exports = ApiError;
