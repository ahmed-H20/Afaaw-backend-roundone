const { body, param } = require("express-validator");
const validationMiddleware = require("../../middlewares/validationMiddleware");

const createCartItemValidation = [
  body("cartId")
    .notEmpty()
    .withMessage("Cart ID is required")
    .isMongoId()
    .withMessage("Invalid Cart ID"),
  body("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid Product ID"),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be greater than 0"),
  body("color").notEmpty().withMessage("Color is required"),
  body("size")
    .notEmpty()
    .withMessage("Size is required")
    .isString()
    .withMessage("Size must be greater than 0"),

  validationMiddleware,
];

const cartItemIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("Cart Item ID is required")
    .isMongoId()
    .withMessage("Invalid Cart Item ID"),

  validationMiddleware,
];

const updateCartItemValidation = [
  body("cartId")
    .notEmpty()
    .withMessage("Cart ID is required")
    .isMongoId()
    .withMessage("Invalid Cart ID"),
  body("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid Product ID"),
  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be greater than 0"),
  body("color").optional().notEmpty().withMessage("Color is required"),
  body("size").optional().notEmpty().withMessage("Size is required"),

  validationMiddleware,
];

module.exports = {
  createCartItemValidation,
  cartItemIdValidation,
  updateCartItemValidation,
};
