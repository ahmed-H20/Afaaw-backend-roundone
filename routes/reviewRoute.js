const express = require("express");
const {
  createReview,
  getReviewsByProductId,
  getReviewsByUserId,
} = require("../services/reviewService");
const {
  createReviewValidator,
  getReviewsByProductValidator,
  getReviewsByUserValidator,
} = require("../utils/validators/reviews.validator");

const router = express.Router();

router.post("/", createReviewValidator, createReview);
router.get("/product/:productId", getReviewsByProductValidator, getReviewsByProductId);
router.get("/user/:userId", getReviewsByUserValidator, getReviewsByUserId);

module.exports = router;
