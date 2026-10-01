const User = require("../models/userModels");
const ApiError = require("../utils/ApiError");

exports.getAllUsers = () => User.find();

exports.getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new ApiError("User not found", 404);
  return user;
};

exports.createUser = (data) => User.create(data);

exports.updateUser = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!user) throw new ApiError("User not found", 404);
  return user;
};

exports.deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new ApiError("User not found", 404);
  return { message: "User deleted successfully" };
};
