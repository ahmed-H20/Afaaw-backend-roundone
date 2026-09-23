const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const httpStatusText = require("../constants/httpStatusText");

const createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await User.create({
    ...data,
    password: hashedPassword,
  });
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
  const updateData = { ...data };

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  const user = await User.findByIdAndUpdate(id, updateData, {
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

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
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
