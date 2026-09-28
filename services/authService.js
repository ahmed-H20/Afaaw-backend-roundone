const User = require("../models/user.model");
const { generateToken } = require("../utils/generateToken");
const ApiError = require("../utils/ApiError");

exports.signup = async (req, res, next) => {
  const user = await User.create(req.body);
  if (!user) {
    next(new ApiError("failed to create user"));
  }
  const token = generateToken(user);
  res.status(200).json({ user, token });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ApiError("Invalid Email Or Password", 401));
  }
  const correctPass = await user.correctPassword(password);
  if (!correctPass) {
    return next(new ApiError("Invalid Email Or Password", 401));
  }
  const token = generateToken(user);

  return res.status(200).json({ message: "Your Are Logged in", token });
};
