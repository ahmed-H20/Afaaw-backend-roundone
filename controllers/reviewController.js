const reviewService = require("../services/reviewService");

// @desc Create a new review
// @route POST /api/v1/reviews
// @access User
const createReview = async (req, res) => {
  // The author comes from the token, not the body - otherwise a client could
  // post a review as somebody else.
  const review = await reviewService.createReview({
    ...req.validated.body,
    userId: req.user.id,
  });
  res.status(201).json({ message: "Review created successfully", review });
};

// @desc Get all reviews for a product
// @route GET /api/v1/reviews/:productId
// @access Public
const getReviewsByProductId = async (req, res) => {
  const reviews = await reviewService.getReviewsByProductId(
    req.validated.params.productId,
  );
  res.status(200).json({ reviews });
};

// @desc Get all reviews written by a user
// @route GET /api/v1/reviews/user/:userId
// @access Public
const getReviewsByUserId = async (req, res) => {
  const reviews = await reviewService.getReviewsByUserId(
    req.validated.params.userId,
  );
  res.status(200).json({ reviews });
};

module.exports = {
  createReview,
  getReviewsByProductId,
  getReviewsByUserId,
};
