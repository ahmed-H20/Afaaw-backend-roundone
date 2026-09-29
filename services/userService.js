const User = require("../models/userModels");
const AppError = require("../errors/AppError");
const bcrypt = require("bcryptjs");

// @desc Create a new user
// @route POST /api/users
// @access Admin
const createUser = async (req, res, next) => {
  try {
    const userData = { ...req.body };
    if (!userData.username) {
      userData.username = userData.email
        ? userData.email.split("@")[0]
        : `user_${Date.now()}`;
    }

    const user = await User.create(userData);

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
// @access Admin
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
// @access Admin / User
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
// @access Admin / User
const updateUser = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 12);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
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
// @access Admin
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