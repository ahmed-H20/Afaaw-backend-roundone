import * as reviewService from "../services/review.service.js";

const getAllReviews = async (req, res) => {
  const reviews = await reviewService.getAllReviews();
  res.json(reviews);
};

const getReviewById = async (req, res) => {
  const review = await reviewService.getReviewById(req.validated.params.id);
  res.json(review);
};

const createReview = async (req, res) => {
  const review = await reviewService.createReview(req.validated.body);
  res.status(201).json(review);
};

const updateReview = async (req, res) => {
  const review = await reviewService.updateReview(req.validated.params.id, req.validated.body);
  res.json(review);
};

const deleteReview = async (req, res) => {
  const review = await reviewService.deleteReview(req.validated.params.id);
  res.json({ message: "Review deleted successfully", review });
};

const getReviewsByProductId = async (req, res) => {
  const reviews = await reviewService.getReviewsByProductId(req.validated.params.productId);
  res.json(reviews);
};

const getReviewsByUserId = async (req, res) => {
  const reviews = await reviewService.getReviewsByUserId(req.validated.params.userId);
  res.json(reviews);
};


export {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getReviewsByUserId,
  getReviewsByProductId
};