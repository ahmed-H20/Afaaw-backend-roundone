const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const httpStatusText = require("../constants/httpStatusText");

const createUser = async (data) => {
  return await User.create(data);
};

const getAllUsers = async () => {
  return await User.find().select("-password");
};

const getUserById = async (id) => {
  const user = await User.findById(id).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found", httpStatusText.FAIL);
  }

  return user;
};

const updateUser = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  }).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found", httpStatusText.FAIL);
  }

  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new ApiError(404, "User not found", httpStatusText.FAIL);
  }

  return user;
};

const getUserByEmail = async (email, includePassword = false) => {
  const query = User.findOne({ email });

  if (includePassword) {
    query.select("+password");
  }

  return await query;
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
  comparePassword,
};
