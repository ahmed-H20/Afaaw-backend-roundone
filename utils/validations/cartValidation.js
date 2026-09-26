const { body, param } = require("express-validator");
const validationMiddleware = require("../../middlewares/validationMiddleware");

const createCartValidation = [
  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid User ID"),

  validationMiddleware,
];

const cartIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("Cart ID is required")
    .isMongoId()
    .withMessage("Invalid Cart ID"),

  validationMiddleware,
];

const cartByUserIdValidation = [
  param("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid User ID"),

  validationMiddleware,
];

module.exports = {
  createCartValidation,
  cartByUserIdValidation,
  cartIdValidation,
};
