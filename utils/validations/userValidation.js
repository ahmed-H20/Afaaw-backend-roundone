const { body, param } = require("express-validator");
const validationMiddleware = require("../../middlewares/validationMiddleware");
const ApiError = require("../ApiError");
const User = require("../../models/userModels");

const createUserValidation = [
  body("fullName").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new ApiError("Email already exists", 400);
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new ApiError("Passwords do not match", 400);
      }
      return true;
    }),

  validationMiddleware,
];

const updateUserValidation = [
  body("fullName").optional().notEmpty().withMessage("Name is required"),
  body("email").optional().isEmail().withMessage("Invalid email"),
  body("password").optional().notEmpty().withMessage("Password is required"),

  validationMiddleware,
];

const userIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid user ID"),

  validationMiddleware,
];

module.exports = {
  createUserValidation,
  updateUserValidation,
  userIdValidation,
};
