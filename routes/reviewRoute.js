const express = require("express");
const reviewRouter = express.Router();

const {
  createReview,
  getReviewsByProductId,
  getReviewsByUserId,
} = require("../services/reviewService");

reviewRouter.post("/", createReview);
reviewRouter.get("/product/:productId", getReviewsByProductId);
reviewRouter.get("/user/:userId", getReviewsByUserId);

module.exports = reviewRouter;
