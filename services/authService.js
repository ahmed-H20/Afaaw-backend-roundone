const User = require("../models/user.model");
const { generateToken } = require("../utils/generateToken");
const ApiError = require("../utils/ApiError");
const crypto = require("crypto");
const { sendEmail } = require("../utils/sendEmail");

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

exports.forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ApiError("User Not Found", 404));
  }

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedResetCode = crypto
    .createHash("sha256", process.env.RESET_CODE_SECRET)
    .update(resetCode)
    .digest("hex");

  user.passResetCode = hashedResetCode;
  user.passResetCodeExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  user.passResetCodeVerified = false;
  await user.save();

  await sendEmail({
    to: user.email,
    subject: "Password Reset Code",
    text: `Your password reset code is: ${resetCode}. It will expire in 10 minutes.`,
  });

  res.status(200).json({
    status: "success",
    message: "Password reset code sent to email",
  });
};

exports.verifyResetCode = async (req, res, next) => {
  const { resetCode } = req.body;

  const hashedResetCode = crypto
    .createHash("sha256", process.env.RESET_CODE_SECRET)
    .update(resetCode)
    .digest("hex");

  const user = await User.findOne({
    passResetCode: hashedResetCode,
    passResetCodeExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ApiError("Invalid Reset Code or expired", 404));
  }

  user.passResetCodeVerified = true;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Reset code verified successfully",
  });
};
