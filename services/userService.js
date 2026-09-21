const User = require("../models/userModels");

// @desc Create a new user
// @route POST /api/users
// @access Public
const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: "User created successfully ✅", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user❌" });
  }
};

// @desc Get all users
// @route GET /api/users
// @access Admin
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: "Users fetched successfully ✅", users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users❌" });
  }
};

// @desc Get a user by id
// @route GET /api/users/:id
// @access Public
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ message: "User fetched successfully ✅", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user❌" });
  }
};

// @desc Update a user
// @route PUT /api/users/:id
// @access Admin
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "User updated successfully ✅", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user❌" });
  }
};

// @desc Delete a user
// @route DELETE /api/users/:id
// @access Admin
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully ✅", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user❌" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
