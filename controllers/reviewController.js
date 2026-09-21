const reviewService = require("../services/reviewService");

// @desc Create a new review
// @route POST /api/reviews
// @access User
const createReview = async (req, res) => {
  try {
    const review = await reviewService.createReview(req.body);
    res.status(201).json({ message: "Review created successfully", review });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json({ message: error.statusCode ? error.message : "Error creating review" });
  }
};

// @desc Get all reviews for a product
// @route GET /api/reviews/product/:productId
// @access Public
const getReviewsByProductId = async (req, res) => {
  try {
    const reviews = await reviewService.getReviewsByProductId(
      req.params.productId,
    );
    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json({ message: error.statusCode ? error.message : "Error fetching reviews" });
  }
};

// @desc Get all reviews written by a user
// @route GET /api/reviews/user/:userId
// @access User
const getReviewsByUserId = async (req, res) => {
  try {
    const reviews = await reviewService.getReviewsByUserId(req.params.userId);
    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 500)
      .json({ message: error.statusCode ? error.message : "Error fetching reviews" });
  }
};

module.exports = {
  createReview,
  getReviewsByProductId,
  getReviewsByUserId,
};
