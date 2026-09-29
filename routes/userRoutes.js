const express = require("express");
const { registerController, logInController } = require("../controller/authController");
const router = express.Router();
const { registerValidation,LogInValidation } = require("../utils/validation/authValidation")


router.post("/register", registerValidation, registerController);
router.post("/login", LogInValidation, logInController);


module.exports = router;