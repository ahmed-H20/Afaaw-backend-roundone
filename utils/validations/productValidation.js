const { body, param } = require("express-validator");
const validationMiddleware = require("../../middlewares/validationMiddleware");

const createProductValidation = [
  body("name").notEmpty().withMessage("Product name is required").isString(),
  body("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isFloat({ min: 0 })
    .withMessage("Product price must be greater than 0"),
  body("description").notEmpty().withMessage("Product description is required"),
  body("category").notEmpty().withMessage("Product category is required"),
  body("stock")
    .notEmpty()
    .withMessage("Product stock is required")
    .isInt({ min: 0 })
    .withMessage("Product stock must be greater than 0"),

  validationMiddleware,
];

const productIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid product ID"),
  validationMiddleware,
];

module.exports = { createProductValidation, productIdValidation };
