const express = require("express");
const router = express.Router();
const {
  createReviewValidation,
  userIdValidation,
  productIdValidation,
} = require("../utils/validations/reviewValidation");

const {
  createReview,
  getReviewByProductId,
  getReviewsByUserId,
} = require("../services/reviewService");

router.post("/", createReviewValidation, createReview);
router.get("/user/:userId", userIdValidation, getReviewsByUserId);
router.get("/:productId", productIdValidation, getReviewByProductId);

module.exports = router;
