const Review = require("../models/review.model");
const ApiError = require("../utils/ApiError");
const httpStatusText = require("../constants/httpStatusText");

const createReview = async (data) => {
  return await Review.create(data);
};

const getAllReviews = async () => {
  return await Review.find()
    .populate("userId", "-password")
    .populate("productId");
};

const getReviewById = async (id) => {
  const review = await Review.findById(id)
    .populate("userId", "-password")
    .populate("productId");

  if (!review) {
    throw new ApiError(404, "Review not found", httpStatusText.FAIL);
  }

  return review;
};

const getReviewsByProductId = async (productId) => {
  return await Review.find({ productId })
    .populate("userId", "-password")
    .populate("productId");
};

const updateReview = async (id, data) => {
  const review = await Review.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  })
    .populate("userId", "-password")
    .populate("productId");

  if (!review) {
    throw new ApiError(404, "Review not found", httpStatusText.FAIL);
  }

  return review;
};

const deleteReview = async (id) => {
  const review = await Review.findByIdAndDelete(id);

  if (!review) {
    throw new ApiError(404, "Review not found", httpStatusText.FAIL);
  }

  return review;
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  getReviewsByProductId,
  updateReview,
  deleteReview,
};
