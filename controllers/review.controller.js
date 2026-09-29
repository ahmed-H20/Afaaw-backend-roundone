const reviewService = require("../services/review.service");
const httpStatusText = require("../constants/httpStatusText");

// @desc Create a new review
// @route POST /api/reviews
// @access Public
const createReview = async (req, res) => {
  const review = await reviewService.createReview(req.body);
  res
    .status(201)
    .json({
      status: httpStatusText.SUCCESS,
      message: "Review created successfully",
      data: { review },
    });
};

// @desc Get all reviews
// @route GET /api/reviews
// @access Public
const getAllReviews = async (req, res) => {
  const reviews = await reviewService.getAllReviews();
  res
    .status(200)
    .json({
      status: httpStatusText.SUCCESS,
      message: "Reviews retrieved successfully",
      data: { reviews },
    });
};

// @desc Get review by ID
// @route GET /api/reviews/:id
// @access Public
const getReviewById = async (req, res) => {
  const review = await reviewService.getReviewById(req.params.id);
  res
    .status(200)
    .json({
      status: httpStatusText.SUCCESS,
      message: "Review retrieved successfully",
      data: { review },
    });
};

// @desc Get reviews by product ID
// @route GET /api/reviews/product/:productId
// @access Public
const getReviewsByProductId = async (req, res) => {
  const reviews = await reviewService.getReviewsByProductId(
    req.params.productId,
  );
  res
    .status(200)
    .json({
      status: httpStatusText.SUCCESS,
      message: "Reviews retrieved successfully",
      data: { reviews },
    });
};

// @desc Update a review
// @route PUT /api/reviews/:id
// @access Public
const updateReview = async (req, res) => {
  const review = await reviewService.updateReview(req.params.id, req.body);
  res
    .status(200)
    .json({
      status: httpStatusText.SUCCESS,
      message: "Review updated successfully",
      data: { review },
    });
};

// @desc Delete a review
// @route DELETE /api/reviews/:id
// @access Public
const deleteReview = async (req, res) => {
  await reviewService.deleteReview(req.params.id);
  res
    .status(200)
    .json({
      status: httpStatusText.SUCCESS,
      message: "Review deleted successfully",
      data: null ,
    });
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  getReviewsByProductId,
  updateReview,
  deleteReview,
};
