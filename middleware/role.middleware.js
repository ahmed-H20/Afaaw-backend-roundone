const ApiError = require("../utils/ApiError");
const { FAIL } = require("../constants/httpStatusText");

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "Not authorized", FAIL));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(
          403,
          "You do not have permission to perform this action",
          FAIL,
        ),
      );
    }

    next();
  };
};

module.exports = authorize;
