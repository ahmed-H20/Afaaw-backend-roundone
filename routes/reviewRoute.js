const express = require("express");

const reviewRouter = express.Router();

const {
  createReview,
  getReviewsByProductId,
  getReviewsByUserId,
} = require("../services/reviewService");

const validate = require("../middlewares/validation.middleware");
const { protect } = require("../middlewares/auth.middleware");

const {
  createReviewSchema,
  productIdSchema,
  userIdSchema,
} = require("../validations/review.validation");

// Public route: view reviews of a product
reviewRouter.get(
  "/product/:productId",
  validate(productIdSchema),
  getReviewsByProductId
);

// Authenticated user routes
reviewRouter.post(
  "/",
  protect,
  validate(createReviewSchema),
  createReview
);

reviewRouter.get(
  "/user/:userId",
  protect,
  validate(userIdSchema),
  getReviewsByUserId
);

module.exports = reviewRouter;