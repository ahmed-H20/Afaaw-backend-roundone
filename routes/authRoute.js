const express = require("express");
const router = express.Router();

const { signup, login } = require("../services/authService");
const { createUserValidator } = require("../utils/validators/user.validator");

router.post("/signup", createUserValidator, signup);
router.post("/login", login);

module.exports = router;
