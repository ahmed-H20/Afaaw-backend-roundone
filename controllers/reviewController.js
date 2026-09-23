const reviewService = require("../services/reviewService");

// @desc Create a new review
// @route POST /api/reviews
// @access User
const createReview = async (req, res) => {
  const review = await reviewService.createReview(req.validated.body);
  res.status(201).json({ message: "Review created successfully", review });
};

// @desc Get all reviews for a product
// @route GET /api/reviews/:productId
// @access Public
const getReviewsByProductId = async (req, res) => {
  const reviews = await reviewService.getReviewsByProductId(
    req.validated.params.productId,
  );
  res.status(200).json({ reviews });
};

// @desc Get all reviews written by a user
// @route GET /api/reviews/user/:userId
// @access User
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
