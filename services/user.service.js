const User = require("../models/user.model");

const createUser = async (data) => {
  return await User.create(data);
};

const getAllUsers = async () => {
  return await User.find();
};

const getUserById = async (id) => {
  return await User.findById(id).select("-password");
};

const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).select("-password");
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};