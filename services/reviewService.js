const Review = require("../models/reviewsModel");
const ApiError = require("../utils/ApiError");

// @desc Create a new review
// @route POST /api/reviews
// @access User
const createReview = async (data) => {
  if (!data) {
    throw new ApiError("Review data is required", 400);
  }

  if (data.rating < 1 || data.rating > 5) {
    throw new ApiError("Rating must be between 1 and 5", 400);
  }

  if (!data.comment) {
    throw new ApiError("Comment is required", 400);
  }

  return Review.create(data);
};

// @desc Get all reviews for a product
// @route GET /api/reviews/:productId
// @access Public
const getReviewsByProductId = (productId) => Review.find({ productId });

// @desc Get all reviews by a user
// @route GET /api/reviews/user/:userId
// @access User
const getReviewsByUserId = (userId) => Review.find({ userId });

module.exports = {
  createReview,
  getReviewsByProductId,
  getReviewsByUserId,
};
