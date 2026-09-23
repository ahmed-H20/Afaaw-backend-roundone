const User = require("../models/userModels");
const AppError = require("../errors/AppError");

// @desc Create a new user
// @route POST /api/users
// @access Public
const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get all users
// @route GET /api/users
// @access Public / Admin
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

// @desc Get a user by ID
// @route GET /api/users/:id
// @access Public / Admin
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

// @desc Update a user
// @route PUT /api/users/:id
// @access Public / Admin
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Delete a user
// @route DELETE /api/users/:id
// @access Public / Admin
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};