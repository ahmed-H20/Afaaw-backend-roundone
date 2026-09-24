const User = require("../models/userModels");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

// @desc Create a new user
// @route POST /api/users
// @access Public
const createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({ message: "User created successfully ✅", user });
});

// @desc Get all users
// @route GET /api/users
// @access Admin
const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ message: "Users fetched successfully ✅", users });
});

// @desc Get a user by id
// @route GET /api/users/:id
// @access Public
const getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  res.status(200).json({ message: "User fetched successfully ✅", user });
});

// @desc Update a user
// @route PUT /api/users/:id
// @access Admin
const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  res.status(200).json({ message: "User updated successfully ✅", user });
});

// @desc Delete a user
// @route DELETE /api/users/:id
// @access Admin
const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  res.status(200).json({ message: "User deleted successfully ✅", user });
});

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
