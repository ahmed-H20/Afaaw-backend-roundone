const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const ApiError = require("../utils/ApiError");

exports.authenticate = async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders?.startsWith("Bearer ")) {
    return next(new ApiError("no token provided", 401));
  }
  const token = authHeaders.split(" ")[1];
  if (!token) {
    return next(new ApiError("You are not authenticated please login", 401));
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decode._id);
  if (!user) {
    return next(
      new ApiError("The user belonging to this token does not exist", 401),
    );
  }

  if (!user.active) {
    return next(new ApiError("user not active", 401));
  }
  req.user = user;
  next();
};
