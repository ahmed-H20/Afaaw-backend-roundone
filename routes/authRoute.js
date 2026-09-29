const express = require("express");
const authRouter = express.Router();

const {
  register,
  login,
  getMe,
  logout,
  refreshToken,
} = require("../controllers/authController");

const validate = require("../middlewares/validation.middleware");
const { protect } = require("../middlewares/auth.middleware");
const {
  registerSchema,
  loginSchema,
} = require("../validations/auth.validation");

authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(loginSchema), login);


module.exports = authRouter;
