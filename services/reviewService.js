const Review = require("../models/reviewsModel");

// Helper to build an error the controller can turn into a status code
const httpError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// Create a new review
const createReview = async (data) => {
  if (!data || Object.keys(data).length === 0) {
    throw httpError("Review data is required", 400);
  }

  if (data.rating < 1 || data.rating > 5) {
    throw httpError("Rating must be between 1 and 5", 400);
  }

  if (!data.comment) {
    throw httpError("Comment is required", 400);
  }

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
