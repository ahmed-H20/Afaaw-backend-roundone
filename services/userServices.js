const User = require("../models/userModels");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

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
    res.status(200).json({ user });
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

// @desc Get logged in User data
// @route GET /api/users/me
// @access Private protected
const getLoggedUserData = async (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

//@ desc update logged user data
// @route PUT /api/users/updateMe
// @access Private protected
const updateLoggedUserData = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      email: req.user.email,
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
    },
    { new: true },
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "User updated successfully", user });
};

// @desc update logged user password
// @route PUT /api/users/updateMyPassword
// @access Private protected
const updateLoggedUserPassword = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    { new: true },
  );

  if (!user) {
    return next(new ApiError("Cannot find user with id ", 404));
  }

  const token = generateToken({ id: user._id });
  res.status(200).json({
    message: "Password updated successfully",
    token,
  });
};

const unActiveUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      active: false,
    },
    { new: true },
  );
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ message: "User deactivated successfully", user });
};

const activeUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      active: true,
    },
    { new: true },
  );
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ message: "User activated successfully", user });
};
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getLoggedUserData,
  updateLoggedUserData,
  updateLoggedUserPassword,
  unActiveUser,
  activeUser,
};
