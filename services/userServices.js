const User = require("../models/userModels");
const asyncHandler = require("express-async-handler");

// @desc Create a new User
// @route POST /api/Users
// @access Admin
const createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({ message: "User created successfully", User });
});

// @desc Get all Users
// @route GET /api/Users
// @access Public
const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users);
});
// @desc Get a User by ID
// @route GET /api/Users/:id
// @access Public
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ User });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching User" });
  }
};

// @desc Update a User
// @route PUT /api/Users/:id
// @access Admin
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", User });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating User" });
  }
};

// @desc Delete a User
// @route DELETE /api/Users/:id
// @access Admin
const deleteUser = async (req, res, next) => {
  try {
    const User = await User.findByIdAndDelete(req.params.id);
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting product" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
