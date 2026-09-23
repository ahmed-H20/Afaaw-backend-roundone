const Review = require("../models/reviewsModel");
const AppError = require("../errors/AppError");

// @desc Create a new review
// @route POST /api/reviews
// @access User
const createReview = async (req, res, next) => {
  try {
    const review = await Review.create(req.body);

    res.status(201).json({
      message: "Review created successfully",
      review,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get all reviews for a product
// @route GET /api/reviews/:productId
// @access Public
const getReviewsByProductId = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId,
    });

    res.status(200).json({ reviews });
  } catch (error) {
    next(error);
  }
};

// @desc Get all reviews by a user
// @route GET /api/reviews/user/:userId
// @access User
const getReviewsByUserId = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      userId: req.params.userId,
    });

    res.status(200).json({ reviews });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReview,
  getReviewsByProductId,
  getReviewsByUserId,
};