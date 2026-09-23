const userService = require("./user.service");
const { generateToken } = require("../utils/jwt");
const ApiError = require("../utils/ApiError");
const httpStatusText = require("../constants/httpStatusText");

const register = async (data) => {
  const existingUser = await userService.getUserByEmail(data.email);

  if (existingUser) {
    throw new ApiError(409, "Email is already registered", httpStatusText.FAIL);
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
    throw new ApiError(401, "Invalid email or password", httpStatusText.FAIL);
  }

  const isPasswordValid = await userService.comparePassword(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password", httpStatusText.FAIL);
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