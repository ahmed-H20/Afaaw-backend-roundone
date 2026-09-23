const { body, param } = require("express-validator");

const createCartValidation = [
    body("userId")
        .notEmpty()
        .withMessage("User ID is required")
        .isMongoId()
        .withMessage("User ID must be a valid MongoDB ID"),
];

const cartIdValidation = [
    param("cartId")
        .isMongoId()
        .withMessage("Invalid cart ID"),
];

const cartItemIdValidation = [
    param("itemId")
        .isMongoId()
        .withMessage("Invalid cart item ID"),
];

const addItemToCartValidation = [
    body("productId")
        .notEmpty()
        .withMessage("Product ID is required")
        .isMongoId()
        .withMessage("Product ID must be a valid MongoDB ID"),

    body("quantity")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Quantity must be a positive integer"),

    body("color")
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage("Color cannot exceed 50 characters"),

    body("size")
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage("Size cannot exceed 20 characters"),
];

const updateCartItemValidation = [
    body("quantity")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Quantity must be a positive integer"),

    body("color")
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage("Color cannot exceed 50 characters"),

    body("size")
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage("Size cannot exceed 20 characters"),
];

module.exports = {
    createCartValidation,
    cartIdValidation,
    cartItemIdValidation,
    addItemToCartValidation,
    updateCartItemValidation,
};
