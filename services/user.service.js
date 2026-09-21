const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await User.create({
    ...data,
    password: hashedPassword,
  });
};

const getAllUsers = async () => {
  return await User.find().select("-password");
};

const getUserById = async (id) => {
  return await User.findById(id).select("-password");
};

const updateUser = async (id, data) => {
  const updateData = { ...data };

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  return await User.findByIdAndUpdate(id, updateData, {
    returnDocument: "after",
    runValidators: true,
  }).select("-password");
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
  comparePassword,
};
