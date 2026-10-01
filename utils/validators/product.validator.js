const { body, param } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validator.middleware");
const categoryModel = require("../../models/category");

const productId = param("id").isMongoId().withMessage("Invalid product id");
const productFields = (required) => [
  body("name")
    [required ? "notEmpty" : "optional"]()
    .trim()
    .withMessage("Product name is required")
    .isLength({ max: 150 })
    .withMessage("Product name cannot exceed 150 characters"),
  body("description")
    [required ? "notEmpty" : "optional"]()
    .trim()
    .withMessage("Product description is required"),
  body("price")
    [required ? "notEmpty" : "optional"]()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a non-negative number")
    .toFloat(),
  body("stock")
    [required ? "notEmpty" : "optional"]()
    .withMessage("Stock is required")
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer")
    .toInt(),
  body("color").optional().isArray().withMessage("Color must be an array"),
  body("color.*")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Each color must be a non-empty string"),
  body("size").optional().isArray().withMessage("Size must be an array"),
  body("size.*")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Each size must be a non-empty string"),
  body("category")
    .notEmpty()
    .withMessage("category is required")
    .isMongoId()
    .withMessage("Invalid category ID")
    .custom((category, { req }) => {
      const Category = categoryModel.findById(category);
      if (!Category) {
        throw new ApiError("Category not found");
      }
    }),
];

exports.createProductValidator = [...productFields(true), validatorMiddleware];
exports.getProductValidator = [productId, validatorMiddleware];
exports.deleteProductValidator = [productId, validatorMiddleware];
exports.updateProductValidator = [
  productId,
  ...productFields(false),
  validatorMiddleware,
];
