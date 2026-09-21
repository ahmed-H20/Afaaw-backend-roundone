const reviewService = require("../services/review.service");

// @desc Create a new review
// @route POST /api/reviews
// @access Public
const createReview = async (req, res) => {
  try {
    const review = await reviewService.createReview(req.body);

    res.status(201).json({
      message: "Review created successfully",
      review,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error creating review",
    });
  }
};

// @desc Get all reviews
// @route GET /api/reviews
// @access Public
const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getAllReviews();

    res.status(200).json({
      reviews,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching reviews",
    });
  }
};

// @desc Get review by ID
// @route GET /api/reviews/:id
// @access Public
const getReviewById = async (req, res) => {
  try {
    const review = await reviewService.getReviewById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.status(200).json({
      review,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching review",
    });
  }
};

// @desc Get reviews by product ID
// @route GET /api/reviews/product/:productId
// @access Public
const getReviewsByProductId = async (req, res) => {
  try {
    const reviews = await reviewService.getReviewsByProductId(
      req.params.productId
    );

    res.status(200).json({
      reviews,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching product reviews",
    });
  }
};

// @desc Update a review
// @route PUT /api/reviews/:id
// @access Public
const updateReview = async (req, res) => {
  try {
    const review = await reviewService.updateReview(
      req.params.id,
      req.body
    );

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.status(200).json({
      message: "Review updated successfully",
      review,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error updating review",
    });
  }
};

// @desc Delete a review
// @route DELETE /api/reviews/:id
// @access Public
const deleteReview = async (req, res) => {
  try {
    const review = await reviewService.deleteReview(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.status(200).json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error deleting review",
    });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  getReviewsByProductId,
  updateReview,
  deleteReview,
};