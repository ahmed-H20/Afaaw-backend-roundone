const { body, param } = require("express-validator");
const validationMiddleware = require("../../middlewares/validationMiddleware");

const createReviewValidation = [
  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid user ID"),
  body("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid product ID"),
  body("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("comment").notEmpty().withMessage("Comment is required"),

  validationMiddleware,
];

const userIdValidation = [
  param("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid user ID"),

  validationMiddleware,
];

const productIdValidation = [
  param("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid product ID"),
  validationMiddleware,
];

module.exports = {
  createReviewValidation,
  userIdValidation,
  productIdValidation,
};
