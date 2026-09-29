const authService = require("../services/auth.service");
const httpStatusText = require("../constants/httpStatusText");

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
const register = async (req, res) => {
    const result = await authService.register(req.body);

    res.status(201).json({
      status: httpStatusText.SUCCESS,
      message: "User registered successfully",
      data: result,
    });
};

// @desc Login user
// @route POST /api/auth/login
// @access Public
const login = async (req, res) => {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.status(200).json({
      status: httpStatusText.SUCCESS,
      message: "Login successful",
      data: result,
    });

};

module.exports = {
  register,
  login,
};