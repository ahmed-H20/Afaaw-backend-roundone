const errorMiddleware = (err, req, res, next) => {
  const operational = err.isOperational;

  if (operational) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    error: "Something went wrong",
  });
};

module.exports = errorMiddleware;
