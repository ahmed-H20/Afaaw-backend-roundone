const express = require("express");
const router = express.Router();
const { createUserValidation } = require("../utils/validations/userValidation");

const { signup, login } = require("../services/authService");

router.post("/signup", createUserValidation, signup);
router.post("/login", login);
module.exports = router;
