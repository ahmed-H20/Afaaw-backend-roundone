const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  forgetPassword,
  verifyResetCode,
} = require("../services/authService");
const { createUserValidator } = require("../utils/validators/user.validator");

router.post("/signup", createUserValidator, signup);
router.post("/login", login);
router.post("/forget-password", forgetPassword);
router.post("/verify-reset-code", verifyResetCode);
module.exports = router;
