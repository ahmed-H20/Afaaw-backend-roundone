const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const {
  createReview,
  getReviewsByProductId,
  getReviewsByUserId,
} = require("../controllers/reviewController");
const {
  createReviewValidator,
  getReviewsByProductValidator,
  getReviewsByUserValidator,
} = require("../utils/validators/reviews.validator");

const router = express.Router();

router.post("/", authenticate, createReviewValidator, createReview);
router.get(
  "/product/:productId",
  getReviewsByProductValidator,
  getReviewsByProductId,
);
router.get(
  "/user/:userId",
  authenticate,
  getReviewsByUserValidator,
  getReviewsByUserId,
);

module.exports = router;
