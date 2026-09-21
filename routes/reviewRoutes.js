const express = require("express");
const router = express.Router();

const {
  createReview,
  getReviewsByProductId,
  getReviewsByUserId,
} = require("../controllers/reviewController");

router.post("/", createReview);
router.get("/user/:userId", getReviewsByUserId);
router.get("/:productId", getReviewsByProductId);

module.exports = router;
