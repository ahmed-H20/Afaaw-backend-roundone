const ApiError = require("../utils/ApiError");
const User = require("../models/userModels");
const { verifyAccessToken } = require("../utils/tokenService");

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next(ApiError.unauthorized("You are not logged in"));
  }
  const token = authHeader.split(" ")[1];

  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch (error) {
    // jwt.verify throws TokenExpiredError or JsonWebTokenError. Both are
    // "your token is no good" - never a 500.
    if (error.name === "TokenExpiredError") {
      return next(
        ApiError.unauthorized("Session expired, please log in again"),
      );
    }
    return next(ApiError.unauthorized("Invalid token"));
  }

  // Re-read the user: the account may have been deleted
  const user = await User.findById(payload.id);
  if (!user) {
    return next(ApiError.unauthorized("This account no longer exists"));
  }

  if (user.passwordChangedAt) {
    const changedAtSec = Math.floor(user.passwordChangedAt.getTime() / 1000);
    if (payload.iat < changedAtSec) {
      return next(
        ApiError.unauthorized(
          "Password was changed recently, please log in again",
        ),
      );
    }
  }

  req.user = user;
  next();
};

module.exports = protect;
