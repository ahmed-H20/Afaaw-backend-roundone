const { body, param } = require("express-validator");

const createOrderValidation = [
    body("userId")
        .notEmpty()
        .withMessage("User ID is required")
        .isMongoId()
        .withMessage("User ID must be a valid MongoDB ID"),

    body("status")
        .optional()
        .isIn(["pending", "confirmed", "shipped", "delivered", "cancelled"])
        .withMessage("Status is invalid"),

    body("date")
        .optional()
        .isISO8601()
        .withMessage("Date must be a valid ISO date"),

    body("items")
        .optional()
        .isArray({ min: 1 })
        .withMessage("Items must be an array"),
];

const orderIdValidation = [
    param("id")
        .isMongoId()
        .withMessage("Invalid order ID"),
];

const updateOrderStatusValidation = [
    body("status")
        .notEmpty()
        .withMessage("Status is required")
        .isIn(["pending", "confirmed", "shipped", "delivered", "cancelled"])
        .withMessage("Status is invalid"),
];

module.exports = {
    createOrderValidation,
    orderIdValidation,
    updateOrderStatusValidation,
};
