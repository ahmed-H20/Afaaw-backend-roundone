const User = require("../models/userModel");

// Helper to build an error the controller can turn into a status code
const httpError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

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
    throw httpError("User not found", 404);
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
    throw httpError("User not found", 404);
  }
  return user;
};

// Delete a user by ID
const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw httpError("User not found", 404);
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
