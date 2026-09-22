const { body, param } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validator.middleware");

const userId = param("id").isMongoId().withMessage("Invalid user id");

exports.createUserValidator = [
  body("fullName").trim().notEmpty().withMessage("Full name is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("A valid email is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  validatorMiddleware,
];

exports.getUserValidator = [userId, validatorMiddleware];
exports.deleteUserValidator = [userId, validatorMiddleware];

exports.updateUserValidator = [
  userId,
  body("fullName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Full name cannot be empty"),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("A valid email is required"),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  validatorMiddleware,
];
