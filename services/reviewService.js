const Review = require("../models/reviewsModel");

// @desc Create a new review
// @route POST /api/reviews
// @access User
const createReview = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Review data is required" });
    }

    if (req.body.rating < 1 || req.body.rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    if (!req.body.comment) {
      return res.status(400).json({ message: "Comment is required" });
    }

    const review = await Review.create(req.body);
    res.status(201).json({ message: "Review created successfully", review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating review" });
  }
};

// @desc Get all reviews for a product
// @route GET /api/reviews/:productId
// @access Public
const getReviewByProductId = async (req, res, next) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching review" });
  }
};

// @desc Get all reviews by a user
// @route GET /api/reviews/user/:userId
// @access User
const getReviewsByUserId = async (req, res, next) => {
  try {
    const reviews = await Review.find({ userId: req.params.userId });
    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

module.exports = {
  createReview,
  getReviewByProductId,
  getReviewsByUserId,
};
