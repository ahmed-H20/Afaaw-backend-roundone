const bcrypt = require("bcrypt");
const ApiError = require("../utils/ApiError");
const User = require("../models/userModels");
const { issueTokens } = require("../utils/tokenService");

//resahpe user
const publicUser = (user) => ({
  _id: user._id,
  fullName: user.fullName,
  email: user.email,
  createdAt: user.createdAt,
});

// @desc Create an account and start a session
// @route POST /api/v1/auth/register
// @access Public
const register = async ({ fullName, email, password }) => {
  //  The unique index is the only real guarantee

  let user;
  try {
    user = await User.create({ fullName, email, password });
  } catch (error) {
    if (error.code === 11000) {
      throw ApiError.conflict("An account with this email already exists");
    }
    throw error;
  }

  // Credentials were just supplied and accepted, so start the session now.
  return { user: publicUser(user), ...issueTokens(user) };
};

// @desc Verify credentials and start a session
// @route POST /api/v1/auth/login
// @access Public
const login = async ({ email, password }) => {
  const foundUser = await User.findOne({ email }).select("+password").exec();

  if (!foundUser) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  return { user: publicUser(foundUser), ...issueTokens(foundUser) };
};

module.exports = { register, login, publicUser };
