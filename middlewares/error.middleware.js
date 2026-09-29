const errorMiddleware = (err, req, res, next) => {
  // Handle Zod validation errors
  if (err.name === "ZodError" || err.issues) {
    const message = err.issues
      ? err.issues.map((i) => i.message).join(", ")
      : err.message;
    return res.status(400).json({
      error: message || "Validation error",
      details: err.issues || err.errors,
    });
  }

  // Handle Mongoose duplicate key error (e.g. unique username or email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return res.status(400).json({
      error: `User with this ${field} already exists`,
    });
  }

  // Handle custom AppError
  const operational = err.isOperational;
  if (operational) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  // Default server error
  return res.status(500).json({
    error: "Something went wrong",
  });
};

module.exports = errorMiddleware;
