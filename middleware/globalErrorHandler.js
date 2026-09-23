const ApiError = require("../utils/ApiError");

const sendErrorDev = (err, res) => {
    res.status(err.statusCode || 500).json({
        status: err.status || "error",
        message: err.message,
        error: err,
        stack: err.stack,
        ...(err.errors && err.errors.length ? { errors: err.errors } : {}),
    });
};

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        return res.status(err.statusCode || 500).json({
            status: err.status || "error",
            message: err.message,
        });
    }

    return res.status(500).json({
        status: "error",
        message: "Something went wrong on the server.",
    });
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (err.name === "CastError") {
        err = new ApiError(400, `Invalid ${err.path}: ${err.value}`);
    }

    if (err.code === 11000) {
        const value = Object.keys(err.keyPattern || {})[0];
        err = new ApiError(409, `Duplicate field value: ${value}. Please use another value.`);
    }

    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map((error) => ({
            field: error.path,
            message: error.message,
        }));
        err = new ApiError(400, "Validation failed", true, errors);
    }

    if (process.env.NODE_ENV === "development") {
        return sendErrorDev(err, res);
    }

    return sendErrorProd(err, res);
};
