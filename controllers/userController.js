const userService = require("../services/userService");
const ApiError = require("../utils/ApiError");
const { publicUser } = require("../services/authService");

// @desc Create a new user
// @route POST /api/v1/users
// @access Admin
const createUser = async (req, res) => {
  const user = await userService.createUser(req.validated.body);
  res.status(201).json({ message: "User created successfully", user: publicUser(user) });
};

// @desc Get all users
// @route GET /api/v1/users
// @access Admin
const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json({ users: users.map(publicUser) });
};

// @desc Get the caller's own account
// @route GET /api/v1/users/me
// @access User
const getMe = async (req, res) => {
  res.status(200).json({ user: publicUser(req.user) });
};

// @desc Get a user by ID
// @route GET /api/v1/users/:id
// @access Admin
const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.validated.params.id);
  res.status(200).json({ user: publicUser(user) });
};

// @desc Update a user
// @route PUT /api/v1/users/:id
// @access User (self) or Admin
const updateUser = async (req, res) => {
  // Ownership, not a role - restrictTo can't express "self or admin".
  if (req.user.role !== "admin" && req.user.id !== req.validated.params.id) {
    throw ApiError.forbidden("You can only update your own account");
  }

  const user = await userService.updateUser(
    req.validated.params.id,
    req.validated.body,
  );
  res.status(200).json({ message: "User updated successfully", user: publicUser(user) });
};

// @desc Delete a user
// @route DELETE /api/v1/users/:id
// @access Admin
const deleteUser = async (req, res) => {
  await userService.deleteUser(req.validated.params.id);
  res.status(200).json({ message: "User deleted successfully" });
};

module.exports = {
  createUser,
  getAllUsers,
  getMe,
  getUserById,
  updateUser,
  deleteUser,
};
