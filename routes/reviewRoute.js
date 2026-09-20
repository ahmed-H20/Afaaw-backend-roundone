const express = require("express");
const {
  createReview,
  getReviewsByProductId,
  getReviewsByUserId,
} = require("../services/reviewService");

const router = express.Router();

router.post("/", createReview);
router.get("/product/:productId", getReviewsByProductId);
router.get("/user/:userId", getReviewsByUserId);

module.exports = router;
