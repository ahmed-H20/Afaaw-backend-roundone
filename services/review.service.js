const Review = require("../models/review.model");

const createReview = async (data) => {
  return await Review.create(data);
};

const getAllReviews = async () => {
  return await Review.find()
    .populate("userId", "-password")
    .populate("productId");
};

const getReviewById = async (id) => {
  return await Review.findById(id)
    .populate("userId", "-password")
    .populate("productId");
};

const getReviewsByProductId = async (productId) => {
  return await Review.find({ productId })
    .populate("userId", "-password")
    .populate("productId");
};

const updateReview = async (id, data) => {
  return await Review.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  })
    .populate("userId", "-password")
    .populate("productId");
};

const deleteReview = async (id) => {
  return await Review.findByIdAndDelete(id);
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  getReviewsByProductId,
  updateReview,
  deleteReview,
};
