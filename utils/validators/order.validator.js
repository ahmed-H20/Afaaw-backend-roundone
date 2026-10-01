const { body, param } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validator.middleware");

const orderId = param("id").isMongoId().withMessage("Invalid order id");

exports.getOrderValidator = [orderId, validatorMiddleware];

exports.getOrdersByUserValidator = [
  param("id").isMongoId().withMessage("Invalid user id"),
  validatorMiddleware,
];

exports.createOrderValidator = [
  body("items")
    .isArray({ min: 1 })
    .withMessage("Items must be a non-empty array"),
  body("items.*.productId")
    .isMongoId()
    .withMessage("Each item must have a valid product id"),
  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Each item quantity must be a positive integer")
    .toInt(),
  body("items.*.price")
    .isFloat({ min: 0 })
    .withMessage("Each item price must be a non-negative number")
    .toFloat(),
  body("items.*.color")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Item color cannot be empty"),
  body("items.*.size")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Item size cannot be empty"),
  validatorMiddleware,
];

exports.updateOrderStatusValidator = [
  orderId,
  body("status")
    .isIn(["pending", "confirmed", "shipped", "delivered", "cancelled"])
    .withMessage("Invalid order status"),
  validatorMiddleware,
];

exports.deleteOrderValidator = [orderId, validatorMiddleware];
