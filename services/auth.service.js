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

  const accessToken = generateToken(user._id.toString());

  return {
    user,
    accessToken,
  };
};

const login = async (email, password) => {
  const user = await userService.getUserByEmail(email, true);

  if (!user) {
    throw new ApiError(401, "Invalid email or password", httpStatusText.FAIL);
  }

  if (!user.isActive) {
    throw new ApiError(403, "Account is inactive", httpStatusText.FAIL);
  }

  const isPasswordValid = await userService.comparePassword(
    password,
    user.password,
  );

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password", httpStatusText.FAIL);
  }

  const accessToken = generateToken(user._id.toString());

  return {
    user,
    accessToken,
  };
};

module.exports = {
  register,
  login,
};
