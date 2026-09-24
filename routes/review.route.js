const express = require("express");

const {
  createReview,
  getAllReviews,
  getReviewById,
  getReviewsByProductId,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");
const validate = require("../middleware/validate.middleware");
const {
  createReviewSchema,
  updateReviewSchema,
  reviewIdSchema,
  reviewProductIdSchema,
} = require("../validations/review.validation");

const router = express.Router();

router
  .route("/")
  .post(validate(createReviewSchema), createReview)
  .get(getAllReviews);

router
  .route("/product/:productId")
  .get(validate(reviewProductIdSchema), getReviewsByProductId);

router
  .route("/:id")
  .get(validate(reviewIdSchema), getReviewById)
  .put(validate(updateReviewSchema), updateReview)
  .delete(validate(reviewIdSchema), deleteReview);

module.exports = router;
