const userService = require("../services/userService");

// @desc Create a new user
// @route POST /api/user
// @access Public
const createUser = async (req, res) => {
  const user = await userService.createUser(req.validated.body);
  res.status(201).json({ message: "User created successfully", user });
};

// @desc Get all users
// @route GET /api/user
// @access Admin
const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json({ users });
};

// @desc Get a user by ID
// @route GET /api/user/:id
// @access Admin
const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.validated.params.id);
  res.status(200).json({ user });
};

// @desc Update a user
// @route PUT /api/user/:id
// @access User,Admin
const updateUser = async (req, res) => {
  const user = await userService.updateUser(
    req.validated.params.id,
    req.validated.body,
  );
  res.status(200).json({ message: "User updated successfully", user });
};

// @desc Delete a user
// @route DELETE /api/user/:id
// @access Admin
const deleteUser = async (req, res) => {
  await userService.deleteUser(req.validated.params.id);
  res.status(200).json({ message: "User deleted successfully" });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
