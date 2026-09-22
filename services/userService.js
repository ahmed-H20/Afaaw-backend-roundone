const userController = require("../controllers/userController");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await userController.findAll();
  res.status(200).json(users);
});

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await userController.findById(req.params.id);
  if (!user) {
    throw new ApiError("User not found", 404);
  }
  res.status(200).json(user);
});

exports.createUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const user = await userController.create({ name, email });
  res.status(201).json(user);
});

exports.updateUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const user = await userController.updateById(req.params.id, {
    name,
    email,
  });
  if (!user) {
    throw new ApiError("User not found", 404);
  }
  res.status(200).json(user);
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await userController.deleteById(req.params.id);
  if (!user) {
    throw new ApiError("User not found", 404);
  }
  res.status(200).json({ message: "User deleted successfully" });
});
