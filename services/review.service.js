// Review Service
import { Review } from "../models/review.model.js";
import Product from "../models/product.model.js";
import AppError from "../errors/app-error.js";

const ensureProductExists = async (productId) => {
  if (productId && !(await Product.exists({ _id: productId }))) {
    throw new AppError("Product not found", 404);
  }
};

// @desc Get all reviews
// @route GET /api/reviews
// @access Public
const getAllReviews = async () => {
  return Review.find().lean();
};

// @desc Get a review by ID
// @route GET /api/reviews/:id
// @access Public
const getReviewById = async (id) => {
  const review = await Review.findById(id).lean();
  if (!review) {
    throw new AppError("Review not found", 404);
  }
  return review;
};

// @desc Create a new review
// @route POST /api/reviews
// @access User
const createReview = async (reviewData) => {
  await ensureProductExists(reviewData.productId);
  const review = new Review(reviewData);
  return review.save();
};

// @desc Update a review
// @route PATCH /api/reviews/:id
// @access User
const updateReview = async (id, reviewData) => {
  await ensureProductExists(reviewData.productId);
  const review = await Review.findByIdAndUpdate(id, reviewData, {
    returnDocument: "after",
    runValidators: true,
  }).lean();
  if (!review) {
    throw new AppError("Review not found", 404);
  }
  return review;
};

// @desc Delete a review
// @route DELETE /api/reviews/:id
// @access User
const deleteReview = async (id) => {
  const review = await Review.findByIdAndDelete(id).lean();
  if (!review) {
    throw new AppError("Review not found", 404);
  }
  return review;
};

// @desc Get reviews by product ID
// @route GET /api/reviews/product/:productId
// @access Public
const getReviewsByProductId = async (productId) => {
  return Review.find({ productId }).lean();
};

// @desc Get reviews by user ID
// @route GET /api/reviews/user/:userId
// @access Public
const getReviewsByUserId = async (userId) => {
  return Review.find({ userId }).lean();
};

export {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getReviewsByProductId,
  getReviewsByUserId,
};
