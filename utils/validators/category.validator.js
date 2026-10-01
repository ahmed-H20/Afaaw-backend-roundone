const { body, param } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validator.middleware");

const categoryId = param("id").isMongoId().withMessage("Invalid category id");

exports.createCategoryValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ max: 100 })
    .withMessage("Category name cannot exceed 100 characters"),
  validatorMiddleware,
];

exports.getCategoryValidator = [categoryId, validatorMiddleware];
exports.getCategoryProductsValidator = [categoryId, validatorMiddleware];
