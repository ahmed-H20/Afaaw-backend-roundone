const mongoose = require("mongoose");
const { FAIL, ERROR } = require("../constants/httpStatusText");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = err.errors || null;

  // Mongoose Validation Error
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = "Validation failed";

    errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));
  }

  // Mongoose Cast Error
  if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // MongoDB Duplicate Key Error
  if (err.code === 11000) {
    statusCode = 409;

    const fields = Object.keys(err.keyPattern || {});

    message = `Duplicate value for field: ${fields.join(", ")}`;
  }

  // JWT Errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token has expired";
  }

  res.status(statusCode).json({
    status:
      err.statusText || (statusCode >= 400 && statusCode < 500 ? FAIL : ERROR),
    message,
    ...(errors && { errors }),
    ...(process.env.NODE_ENV !== "production" && {
      stack: err.stack,
    }),
  });
};

module.exports = errorHandler;
