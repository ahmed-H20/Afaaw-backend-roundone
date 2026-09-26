const { body, param } = require("express-validator");
const validationMiddleware = require("../../middlewares/validationMiddleware");

const createOrderItemValidation = [
  body("orderId")
    .notEmpty()
    .withMessage("Order ID is required")
    .isMongoId()
    .withMessage("Invalid Order ID"),
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
  body("color")
    .notEmpty()
    .withMessage("Color is required")
    .isString()
    .withMessage("Color must be a string"),
  body("size")
    .notEmpty()
    .withMessage("Size is required")
    .isString()
    .withMessage("Size must be a string"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be 0 or greater"),

  validationMiddleware,
];

const orderItemIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("Order Item ID is required")
    .isMongoId()
    .withMessage("Invalid Order Item ID"),

  validationMiddleware,
];

const updateOrderItemValidation = [
  body("orderId").not().exists().withMessage("Order ID cannot be updated"),
  body("productId").optional().isMongoId().withMessage("Invalid Product ID"),
  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be greater than 0"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be 0 or greater"),
  body("color").optional().isString(),
  body("size").optional().isString(),

  validationMiddleware,
];

module.exports = {
  createOrderItemValidation,
  orderItemIdValidation,
  updateOrderItemValidation,
};
