const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");

const {
  createReview,
  getReviewsByProductId,
  getReviewsByUserId,
} = require("../controllers/reviewController");

const {
  createReviewSchema,
  reviewUserParams,
  reviewProductParams,
} = require("../validations/review.validation");

router.post("/", validate({ body: createReviewSchema }), createReview);
router.get(
  "/user/:userId",
  validate({ params: reviewUserParams }),
  getReviewsByUserId,
);
router.get(
  "/:productId",
  validate({ params: reviewProductParams }),
  getReviewsByProductId,
);

module.exports = router;
