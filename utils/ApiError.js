class ApiError extends Error {
    constructor(statusCode, message, isOperational = true, errors = []) {
        super(message);
        this.name = "ApiError";
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = isOperational;
        this.errors = errors;

        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message, errors = []) {
        return new ApiError(400, message, true, errors);
    }

    static unauthorized(message = "Unauthorized") {
        return new ApiError(401, message, true);
    }

    static forbidden(message = "Forbidden") {
        return new ApiError(403, message, true);
    }

    static notFound(message = "Resource not found") {
        return new ApiError(404, message, true);
    }

    static conflict(message) {
        return new ApiError(409, message, true);
    }

    static internal(message = "Internal server error") {
        return new ApiError(500, message, false);
    }
}

module.exports = ApiError;
