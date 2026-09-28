const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const ApiError = require("../utils/ApiError")

exports.authenticate = async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders?.startsWith("Bearer ")) {
    return next(new ApiError("no token provided", 401))
  }
  const token = authHeaders.split(" ")[1];
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decode._id);
  req.user = user;
  next();
};
