const Review = require("../models/reviewsModel");

// Shape checks (rating range, comment length, id format) live in
// validations/review.validation.js and run before this is called.

// Create a new review
const createReview = async (data) => {
  return await Review.create(data);
};

// Get all reviews for a product
const getReviewsByProductId = async (productId) => {
  return await Review.find({ productId });
};

// Get all reviews written by a user
const getReviewsByUserId = async (userId) => {
  return await Review.find({ userId });
};

module.exports = {
  createReview,
  getReviewsByProductId,
  getReviewsByUserId,
};
