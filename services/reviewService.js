const Review = require("../models/reviewsModel");
const User = require("../models/userModels");
const Product = require("../models/productsModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

// @desc Create a new review
// @route POST /api/reviews
// @access User
const createReview = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.body.userId);
  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  const product = await Product.findById(req.body.productId);
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }

  const review = await Review.create(req.body);
  res.status(201).json({ message: "Review created successfully", review });
});

// @desc Get all reviews for a product
// @route GET /api/reviews/:productId
// @access Public
const getReviewByProductId = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find({ productId: req.params.productId });
  res.status(200).json({ reviews });
});

// @desc Get all reviews by a user
// @route GET /api/reviews/user/:userId
// @access User
const getReviewsByUserId = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find({ userId: req.params.userId });
  res.status(200).json({ reviews });
});

module.exports = {
  createReview,
  getReviewByProductId,
  getReviewsByUserId,
};
