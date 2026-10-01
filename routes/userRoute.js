const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const { protect } = require("../middleware/auth");
const {
    createUserValidation,
    loginValidation,
    forgotPasswordValidation,
    verifyOtpValidation,
    resetPasswordValidation,
    userIdValidation,
} = require("../utils/validators/userValidator");

const {
    createUser,
    loginUser,
    forgotPassword,
    verifyOtp,
    resetPassword,
    getMe,
    getUserById,
} = require("../controllers/userController");

router.post("/", createUserValidation, validate, createUser);
router.post("/register", createUserValidation, validate, createUser);
router.post("/login", loginValidation, validate, loginUser);
router.post("/forgot-password", forgotPasswordValidation, validate, forgotPassword);
router.post("/verify-otp", verifyOtpValidation, validate, verifyOtp);
router.post("/reset-password", resetPasswordValidation, validate, resetPassword);
router.get("/me", protect, getMe);
router.get("/:id", protect, userIdValidation, validate, getUserById);

module.exports = router;
