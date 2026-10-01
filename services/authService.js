const User = require("../models/userModels");
const { generateToken } = require("../utils/generateToken");
const ApiError = require("../utils/apiError");
const bcrypt = require("bcrypt");

// signup
const signup = async (req, res, next) => {
  // 1- create user
  const user = await User.create(req.body);
  if (!user) {
    return next(new ApiError("Failed to create user", 400));
  }

  // 2- generate token
  const token = generateToken({ userId: user._id });

  // 3- send response
  res.status(201).json({
    user,
    token,
  });
};

// login
const login = async (req, res, next) => {
  // 1- check if user exists
  // 2- check if password is correct
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Invalid information", 401));
  }

  // 3- generate token
  const token = generateToken({ userId: user._id });

  // 4- send response
  res.status(200).json({
    user,
    token,
  });
};
// logout
// forgot password
// verify resetCode
// reset password

module.exports = {
  signup,
  login,
};
