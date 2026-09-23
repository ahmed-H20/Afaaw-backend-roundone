const User = require("../models/userModels");
const ApiError = require("../utils/ApiError");

// Create a new user
const createUser = async (data) => {
  return await User.create(data);
};

// Get all users
const getAllUsers = async () => {
  return await User.find();
};

// Get a single user by ID
const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw ApiError.notFound("User not found");
  }
  return user;
};

// Update a user by ID
const updateUser = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw ApiError.notFound("User not found");
  }
  return user;
};

// Delete a user by ID
const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw ApiError.notFound("User not found");
  }
  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
