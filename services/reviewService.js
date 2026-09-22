const reviewController = require("../controllers/reviewController");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

// @desc Create a new review
// @route POST /api/reviews
// @access User
const createReview = asyncHandler(async (req, res, next) => {
  if (!req.body) {
    throw new ApiError("Review data is required", 400);
  }

  if (req.body.rating < 1 || req.body.rating > 5) {
    throw new ApiError("Rating must be between 1 and 5", 400);
  }

  if (!req.body.comment) {
    throw new ApiError("Comment is required", 400);
  }

  const review = await reviewController.create(req.body);
  res.status(201).json({ message: "Review created successfully", review });
});

// @desc Get all reviews for a product
// @route GET /api/reviews/:productId
// @access Public
const getReviewsByProductId = asyncHandler(async (req, res, next) => {
  const reviews = await reviewController.findByProductId(req.params.productId);
  res.status(200).json({ reviews });
});

// @desc Get all reviews by a user
// @route GET /api/reviews/user/:userId
// @access User
const getReviewsByUserId = asyncHandler(async (req, res, next) => {
  const reviews = await reviewController.findByUserId(req.params.userId);
  res.status(200).json({ reviews });
});

module.exports = {
  createReview,
  getReviewsByProductId,
  getReviewsByUserId,
};
