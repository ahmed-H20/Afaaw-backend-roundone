const { body, param } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validator.middleware");

exports.createReviewValidator = [
  body("userId").isMongoId().withMessage("Invalid user id"),
  body("productId").isMongoId().withMessage("Invalid product id"),
  body("rating")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5")
    .toFloat(),
  body("comment")
    .notEmpty()
    .withMessage("Comment is required")
    .trim()
    .isLength({ max: 200 })
    .withMessage("Comment cannot exceed 200 characters"),
  validatorMiddleware,
];

exports.getReviewsByProductValidator = [
  param("productId").isMongoId().withMessage("Invalid product id"),
  validatorMiddleware,
];

exports.getReviewsByUserValidator = [
  param("userId").isMongoId().withMessage("Invalid user id"),
  validatorMiddleware,
];
