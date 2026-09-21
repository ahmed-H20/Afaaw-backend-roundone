const authService = require("../services/auth.service");

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);

    res.status(201).json({
      message: "User registered successfully",
      ...result,
    });
  } catch (error) {
    console.error(error);

    res.status(error.statusCode || 500).json({
      message: error.message || "Error registering user",
    });
  }
};

// @desc Login user
// @route POST /api/auth/login
// @access Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.status(200).json({
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    console.error(error);

    res.status(error.statusCode || 500).json({
      message: error.message || "Error logging in",
    });
  }
};

module.exports = {
  register,
  login,
};