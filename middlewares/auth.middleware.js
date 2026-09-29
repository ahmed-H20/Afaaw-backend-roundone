const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const AppError = require("../errors/AppError");

const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return next(new AppError("Not authorized, no token", 401));
    }

    let decoded;
    try {
      const secret = process.env.JWT_SECRET || "default_jwt_secret_key";
      decoded = jwt.verify(token, secret);
    } catch (err) {
      return next(new AppError("Not authorized, token failed", 401));
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError("User no longer exists", 401));
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const allowedTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError("Forbidden: insufficient permissions", 403));
    }
    next();
  };
};

module.exports = {
  protect,
  allowedTo,
};
