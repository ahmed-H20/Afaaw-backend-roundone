const { verifyToken } = require("../utils/jwt");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const { FAIL } = require("../constants/httpStatusText");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Not authorized, token is required", FAIL);
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new ApiError(401, "User no longer exists", FAIL);
    }

    if (!user.isActive) {
      throw new ApiError(403, "Account is inactive", FAIL);
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = protect;
