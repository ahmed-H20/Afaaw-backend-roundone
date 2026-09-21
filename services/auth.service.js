const userService = require("./user.service");
const { generateToken } = require("../utils/jwt");

const register = async (data) => {
  const existingUser = await userService.getUserByEmail(data.email);

  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }

  const user = await userService.createUser(data);

  const token = generateToken(user._id.toString());

  const userResponse = user.toObject();
  delete userResponse.password;

  return {
    user: userResponse,
    token,
  };
};

const login = async (email, password) => {
  const user = await userService.getUserByEmail(email);

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await userService.comparePassword(
    password,
    user.password
  );

  if (!isPasswordValid) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user._id.toString());

  const userResponse = user.toObject();
  delete userResponse.password;

  return {
    user: userResponse,
    token,
  };
};

module.exports = {
  register,
  login,
};