const { body, param } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validator.middleware");
const ApiError = require("../ApiError")

const userId = param("id").isMongoId().withMessage("Invalid user id");

exports.createUserValidator = [
  body("name")
    .notEmpty()
    .withMessage("Full name is required")
    .isString()
    .withMessage("User Name must be a String"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("A valid email is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("confirm password is required")
    .custom((confirmPassword, { req }) => {
      if (confirmPassword.toString() !== req.body.password.toString()) {
        throw ApiError("Password Confirmation Incorrect");
      }
      return true;
    }),
  body("phone")
    .notEmpty()
    .withMessage("phone is required")
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number format"),
  body("address")
    .notEmpty()
    .withMessage("address is required")
    .isString()
    .withMessage("address must be a String"),
  body("profileImage").isString().withMessage("profileImage must be a String"),
  body("role")
    .notEmpty()
    .withMessage("role is required")
    .isIn(["user", "admin"])
    .withMessage("role must be either 'user' or 'admin'"),
  body("active").isBoolean().withMessage("active is must be a boolean"),
  validatorMiddleware,
];

exports.getUserValidator = [userId, validatorMiddleware];
exports.deleteUserValidator = [userId, validatorMiddleware];

exports.updateUserValidator = [
  userId,
  body("name")
    .optional()
    .isString()
    .withMessage("User Name must be a String"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("A valid email is required"),
  body("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number format"),
  body("address")
    .optional()
    .isString()
    .withMessage("address must be a String"),
  body("profileImage").isString().withMessage("profileImage must be a String"),
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("role must be either 'user' or 'admin'"),
  body("active").isBoolean().withMessage("active is must be a boolean"),
  validatorMiddleware,
];
