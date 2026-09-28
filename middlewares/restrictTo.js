const ApiError = require("../utils/ApiError");

// Usage: restrictTo("admin")  /  restrictTo("admin", "moderator")
// Must run AFTER protect - it reads req.user.
const restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!req.user) {
      return next(ApiError.unauthorized("You are not logged in"));
    }

    if (!roles.includes(req.user.role)) {
      return next(ApiError.forbidden("You do not have permission to do this"));
    }

    next();
  };

module.exports = restrictTo;
