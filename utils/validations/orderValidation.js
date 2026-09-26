const { body, param } = require("express-validator");
const validationMiddleware = require("../../middlewares/validationMiddleware");

const createOrderValidation = [
  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid User ID"),
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["pending", "confirmed", "shipped", "delivered", "cancelled"])
    .withMessage("Invalid Status"),

  validationMiddleware,
];

const orderIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("Order ID is required")
    .isMongoId()
    .withMessage("Invalid Order ID"),

  validationMiddleware,
];

const updateOrderValidation = [
  body("userId").not().exists().withMessage("User ID cannot be updated"),
  body("status")
    .optional()
    .isIn(["pending", "confirmed", "shipped", "delivered", "cancelled"])
    .withMessage("Invalid Status"),

  validationMiddleware,
];

module.exports = {
  createOrderValidation,
  orderIdValidation,
  updateOrderValidation,
};
