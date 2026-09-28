const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");

const { register, login, logout } = require("../controllers/authController");
const {
  registerSchema,
  loginSchema,
} = require("../validations/auth.validations");

router.post("/register", validate({ body: registerSchema }), register);
router.post("/login", validate({ body: loginSchema }), login);
router.post("/logout", logout);

module.exports = router;
