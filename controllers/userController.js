const userService = require("../services/userService");
// @desc Create a new user
// @route POST /api/user
// @access Public
const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "Error creating user",
    });
  }
};

// @desc Get all users
// @route GET /api/user
// @access Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "Error fetching users",
    });
  }
};

// @desc Get a user by ID
// @route GET /api/user/:id
// @access Admin
const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "Error fetching user",
    });
  }
};

// @desc Update a user
// @route PUT /api/user/:id
// @access User,Admin
const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "Error updating user",
    });
  }
};

// @desc Delete a user
// @route DELETE /api/user/:id
// @access Admin
const deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "Error deleting user",
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
