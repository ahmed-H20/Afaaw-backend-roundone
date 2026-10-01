const { body, param } = require("express-validator");

const createUserValidation = [
    body("fullName")
        .trim()
        .notEmpty()
        .withMessage("Full name is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Full name must be between 2 and 100 characters"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be valid"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),

    body("role")
        .optional()
        .isIn(["user", "admin"])
        .withMessage("Role must be either user or admin"),
];

const loginValidation = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be valid"),

    body("password")
        .notEmpty()
        .withMessage("Password is required"),
];

const forgotPasswordValidation = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be valid"),
];

const verifyOtpValidation = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be valid"),

    body("otp")
        .notEmpty()
        .withMessage("OTP is required")
        .isLength({ min: 6, max: 6 })
        .withMessage("OTP must be exactly 6 digits"),
];

const resetPasswordValidation = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be valid"),

    body("otp")
        .notEmpty()
        .withMessage("OTP is required")
        .isLength({ min: 6, max: 6 })
        .withMessage("OTP must be exactly 6 digits"),

    body("newPassword")
        .notEmpty()
        .withMessage("New password is required")
        .isLength({ min: 6 })
        .withMessage("New password must be at least 6 characters long"),
];

const userIdValidation = [
    param("id")
        .isMongoId()
        .withMessage("Invalid user ID"),
];

module.exports = {
    createUserValidation,
    loginValidation,
    forgotPasswordValidation,
    verifyOtpValidation,
    resetPasswordValidation,
    userIdValidation,
};
