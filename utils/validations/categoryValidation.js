const { body, param } = require("express-validator");
const validationMiddleware = require("../../middlewares/validationMiddleware");

const createCategoryValidation = [
  body("name").notEmpty().withMessage("Name is required"),

  validationMiddleware,
];

const categoryIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Invalid category ID"),

  validationMiddleware,
];

module.exports = {
  createCategoryValidation,
  categoryIdValidation,
};
