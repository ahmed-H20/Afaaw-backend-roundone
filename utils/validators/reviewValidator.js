const { body, param } = require("express-validator");

const createReviewValidation = [
    body("userId")
        .notEmpty()
        .withMessage("User ID is required")
        .isMongoId()
        .withMessage("User ID must be a valid MongoDB ID"),

    body("productId")
        .notEmpty()
        .withMessage("Product ID is required")
        .isMongoId()
        .withMessage("Product ID must be a valid MongoDB ID"),

    body("rating")
        .notEmpty()
        .withMessage("Rating is required")
        .isFloat({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5"),

    body("comment")
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage("Comment cannot exceed 200 characters"),
];

const productIdValidation = [
    param("productId")
        .isMongoId()
        .withMessage("Invalid product ID"),
];

const userIdValidation = [
    param("userId")
        .isMongoId()
        .withMessage("Invalid user ID"),
];

module.exports = {
    createReviewValidation,
    productIdValidation,
    userIdValidation,
};
