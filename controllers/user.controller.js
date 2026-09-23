const userService = require("../services/user.service");
const httpStatusText = require("../constants/httpStatusText");

// @desc Create a new user
// @route POST /api/users
// @access Public
const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  const userResponse = user.toObject();
  delete userResponse.password;

  res.status(201).json({
    status: httpStatusText.SUCCESS,
    message: "User created successfully",
    data: { user: userResponse },
  });
};

// @desc Get all users
// @route GET /api/users
// @access Admin
const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Users retrieved successfully",
    data: { users },
  });
};

// @desc Get user by ID
// @route GET /api/users/:id
// @access Admin
const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "User retrieved successfully",
    data: { user },
  });
};

// @desc Update a user
// @route PUT /api/users/:id
// @access Admin
const updateUser = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "User updated successfully",
    data: { user },
  });
};

// @desc Delete a user
// @route DELETE /api/users/:id
// @access Admin
const deleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "User deleted successfully",
    data: null,
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
