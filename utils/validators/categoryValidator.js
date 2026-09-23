const { body, param } = require("express-validator");

const createCategoryValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Category name must be between 2 and 100 characters"),
];

const updateCategoryValidation = [
    body("name")
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage("Category name must be between 2 and 100 characters"),
];

const categoryIdValidation = [
    param("id")
        .isMongoId()
        .withMessage("Invalid category ID"),
];

module.exports = {
    createCategoryValidation,
    updateCategoryValidation,
    categoryIdValidation,
};
