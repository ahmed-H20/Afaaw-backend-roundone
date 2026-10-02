const express = require("express");
const {
  signup,
  login,
  forgetPassword,
  verifyCode,
  resetPassword,
} = require("../services/authService");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/forgetPass", forgetPassword);
router.post("/verifyCode", verifyCode);
router.post("/resetPass", resetPassword);

module.exports = router;
