const { body, param } = require("express-validator");
const validationMiddleware = require("../../middlewares/validationMiddleware");

const createUserValidation = [
  body("fullName").notEmpty().withMessage("Name is required"),
  body("email").notEmpty().withMessage("Email is required").isEmail(),
  body("password").notEmpty().withMessage("Password is required"),

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
