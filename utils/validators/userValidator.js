const { body, param } = require("express-validator");

const createUserValidation = [
    body("fullName")
        .trim()
        .notEmpty()
        .withMessage("Full name is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Full name must be between 2 and 100 characters"),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be valid"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];

const userIdValidation = [
    param("id")
        .isMongoId()
        .withMessage("Invalid user ID"),
];

module.exports = {
    createUserValidation,
    userIdValidation,
};
