const { body, param } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validator.middleware");

exports.getCartValidator = [
  param("id").isMongoId().withMessage("Invalid user id"),
  validatorMiddleware,
];

exports.getCartItemsValidator = [
  param("cartId").isMongoId().withMessage("Invalid cart id"),
  validatorMiddleware,
];

exports.addProductValidator = [
  body("productId").isMongoId().withMessage("Invalid product id"),
  body("quantity")
    .notEmpty()
    .withMessage("quantity cannot be empty")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer")
    .toInt(),
  body("color")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Color cannot be empty"),
  body("size").optional().trim().notEmpty().withMessage("Size cannot be empty"),
  validatorMiddleware,
];

exports.changeProductQuantityValidator = [
  body("id").isMongoId().withMessage("Invalid cart item id"),
  body("productId").isMongoId().withMessage("Invalid product id"),
  body("quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer")
    .toInt(),
  validatorMiddleware,
];

exports.removeProductValidator = [
  body("id").isMongoId().withMessage("Invalid cart item id"),
  body("productId").isMongoId().withMessage("Invalid product id"),
  validatorMiddleware,
];
