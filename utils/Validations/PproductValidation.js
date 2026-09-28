const { body } = require("express-validator");
const validationMiddleware = require("../../middleware/validatorMiddleware");
const createProductValidator = [
  body("name")
    .notEmpty()
    .withMessage("Product name is required by ahmed")
    .isString(),

  body("price").notEmpty().withMessage("price is required").isFloat({ gt: 0 }),

  body("category")
    .notEmpty()
    .withMessage("category is required")
    .isMongoId()
    .withMessage("Invalid category ID")
    .custom((categoryId, { req }) => {
      // Access the authenticated user from the request object
      const Category = categoryModel.findById(categoryId);
      if (!Category) {
        throw new ApiError("Category not found");
      }
    }),

  validationMiddleware,
];

module.exports = {
  createProductValidator,
};
