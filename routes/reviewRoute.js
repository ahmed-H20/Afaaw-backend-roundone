const express = require("express");
const router = express.Router();

const {
  createReview,
  getReviewByProductId,
  getReviewsByUserId,
} = require("../services/reviewService");

router.post("/", createReview);
router.get("/user/:userId", getReviewsByUserId);
router.get("/:productId", getReviewByProductId);

module.exports = router;
