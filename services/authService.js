const User = require("../models/userModels");
const ApiError = require("../utils/ApiError");
const { generateToken } = require("../utils/generateToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @decs signup user
// @route /api/v1/auth/signup
// @access public
const signup = async (req, res, next) => {
  // 1- create user
  const user = await User.create(req.body);
  if (!user) {
    next(new ApiError("Filed to create user"));
  }

  // 2- generate token
  const token = await generateToken({ id: user._id });

  // 3- sen res
  res.status(200).json({
    user,
    token,
  });
};

// @decs login user
// @route /api/v1/auth/login
// @access public
const login = async (req, res, next) => {
  // 1- check user found
  // 2- check pass correct
  const user = await User.findOne({ email: req.body.email });
  const correctPass = await bcrypt.compare(req.body.password, user.password);
  if (!user || !correctPass) {
    return next(new ApiError("Incorrect email or password"));
  }

  // 3- generate token
  const token = generateToken({ id: user._id });
  // 4- res
  res.status(200).json({
    user,
    token,
  });
};

const protect = async (req, res, next) => {
  let token;
  // 1- check if req have a token , if exist get in var
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ApiError("You are not authenticated, please login", 401));
  }

  // 2- check token valid
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const currentUser = await User.findById(decode.id);
  if (!currentUser) {
    return next(new ApiError("the user not in db", 401));
  }

  if (!currentUser.active) {
    return next(new ApiError("user not active", 401));
  }

  // 4- check if user change his password

  req.user = currentUser;

  next();
};

const allowedTo =
  (...roles) =>
  async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You do not have permission to access this route"),
      );
    }
    next();
  };

module.exports = {
  signup,
  login,
  protect,
  allowedTo,
};
