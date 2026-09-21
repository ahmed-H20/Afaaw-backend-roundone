const userService = require("../services/user.service");

// @desc Create a new user
// @route POST /api/users
// @access Public
const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: "User created successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error creating user",
    });
  }
};

// @desc Get all users
// @route GET /api/users
// @access Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching users",
    });
  }
};

// @desc Get user by ID
// @route GET /api/users/:id
// @access Admin
const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching user",
    });
  }
};

// @desc Update a user
// @route PUT /api/users/:id
// @access Admin
const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(
      req.params.id,
      req.body
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error updating user",
    });
  }
};

// @desc Delete a user
// @route DELETE /api/users/:id
// @access Admin
const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error deleting user",
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