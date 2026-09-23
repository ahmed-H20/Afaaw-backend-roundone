const express = require("express");

const reviewRouter = express.Router();

const {
  createReview,
  getReviewsByProductId,
  getReviewsByUserId,
} = require("../services/reviewService");

const validate = require("../middlewares/validation.middleware");

const {
  createReviewSchema,
  productIdSchema,
  userIdSchema,
} = require("../validations/review.validation");

reviewRouter.post(
  "/",
  validate(createReviewSchema),
  createReview
);

reviewRouter.get(
  "/product/:productId",
  validate(productIdSchema),
  getReviewsByProductId
);

reviewRouter.get(
  "/user/:userId",
  validate(userIdSchema),
  getReviewsByUserId
);

module.exports = reviewRouter;