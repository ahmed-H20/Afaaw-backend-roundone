const express = require("express");

const {
  createReview,
  getAllReviews,
  getReviewById,
  getReviewsByProductId,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");

const router = express.Router();

router
  .route("/")
  .post(createReview)
  .get(getAllReviews);

router
  .route("/product/:productId")
  .get(getReviewsByProductId);

router
  .route("/:id")
  .get(getReviewById)
  .put(updateReview)
  .delete(deleteReview);

module.exports = router;