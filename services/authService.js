const User = require("../models/userModels");
const ApiError = require("../utils/ApiError");
const { generateToken } = require("../utils/generateToken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendMail");

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

//@desc forget password
//@route /api/v1/auth/forgetPass
//@access public
const forgetPassword = async (req, res, next) => {
  //1- get user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There are no users with this email: ${req.body.email}`),
    );
  }

  //2- if exit , generate 6 random numbers, hash it , save it in db
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashResetCode = crypto
    .createHmac("sha256", process.env.SECRET)
    .update(resetCode)
    .digest("hex");
  user.passResetCode = hashResetCode;
  user.passResetCodeExpire = Date.now() + 10 * 60 * 1000;
  user.passResetCodeVerified = false;

  await user.save();

  //3- send email
  await sendEmail(resetCode);

  // 4- res
  res.status(200).json({
    message: " your code sent successfuly",
  });
};

// verify code
const verifyCode = async (req, res, next) => {
  // 1- take resetcode , check on it
  const hashResetCode = crypto
    .createHmac("sha256", process.env.SECRET)
    .update(req.body.resetCode)
    .digest("hex");

  const user = await User.findOne({
    passResetCode: hashResetCode,
    passResetCodeExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ApiError("Invalid reset code or expire", 404));
  }

  // 2- if valid make verify true
  user.passResetCodeVerified = true;
  user.verifyPassExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 min
  await user.save();

  // res
  res.status(200).json({
    status: "success",
    message: "rest code verified",
  });
};

// reset password
const resetPassword = async (req, res, next) => {
  // 1- get user from email
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(
      new ApiError(`There is no user with email: ${req.body.email}`, 404),
    );

  // 2- check if reset verify true
  if (!user.passResetCodeVerified || user.verifyPassExpire < Date.now())
    return next(new ApiError(`Reset code not verified or expired!`, 400));

  const token = generateToken({ id: user._id }); // because if error in token not change password

  // 3- reset password and make others undefined and false
  user.password = req.body.newPassword;
  user.passChangedAt = Date.now();
  user.passResetCode = undefined;
  user.passResetCodeExpire = undefined;
  user.passResetCodeVerified = undefined;
  user.verifyPassExpire = undefined;
  await user.save();

  // 4- generate new token and send with req
  res.status(200).json({
    message: "Password reset successfully✅",
    token: token,
  });
};

module.exports = {
  signup,
  login,
  protect,
  allowedTo,
  forgetPassword,
  verifyCode,
  resetPassword,
};
