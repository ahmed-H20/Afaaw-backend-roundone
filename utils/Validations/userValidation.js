const { body } = require("express-validator");
const validationMiddleware = require("../../middleware/validatorMiddleware");
const User = require("../../models/userModels");
const ApiError = require("../ApiError");
const createUserValidator = [
  body("name")
    .notEmpty()
    .withMessage("User name is required")
    .isString()
    .withMessage("User name must be a string"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  body("confirmPassword")
    .notEmpty()
    .withMessage("confirm Password is required")
    .custom((value, { req }) => {
      if (!value) {
        throw ApiError("confirm password is required");
      }
      if (value.toString() !== req.body.password.toString()) {
        throw ApiError("confirm Password should be match password");
      }
      return true;
    }),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email }).then((user) => {
        if (user) {
          return Promise.reject("Email already in use");
        }
        return true;
      });
    }),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number format"),

  body("address")
    .notEmpty()
    .withMessage("Address is required")
    .isString()
    .withMessage("Address must be a string"),

  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["user", "admin"])
    .withMessage("Role must be either 'user' or 'admin'"),

  body("profileImage").isString().withMessage("Image should be string"),

  body("active").isBoolean().withMessage("active should be true or false"),

  validationMiddleware,
];

module.exports = {
  createUserValidator,
};
