const { body, param } = require("express-validator");

const createProductValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Product name is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Product name must be between 2 and 100 characters"),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters"),

    body("price")
        .notEmpty()
        .withMessage("Price is required")
        .isFloat({ gt: 0 })
        .withMessage("Price must be a positive number"),

    body("stock")
        .notEmpty()
        .withMessage("Stock is required")
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer"),

    body("category")
        .optional()
        .isMongoId()
        .withMessage("Category must be a valid MongoDB ID"),
];

const updateProductValidation = [
    body("name")
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage("Product name must be between 2 and 100 characters"),

    body("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters"),

    body("price")
        .optional()
        .isFloat({ gt: 0 })
        .withMessage("Price must be a positive number"),

    body("stock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer"),

    body("category")
        .optional()
        .isMongoId()
        .withMessage("Category must be a valid MongoDB ID"),
];

const productIdValidation = [
    param("id")
        .isMongoId()
        .withMessage("Invalid product ID"),
];

module.exports = {
    createProductValidation,
    updateProductValidation,
    productIdValidation,
};
