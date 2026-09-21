const Review = require('../models/reviewsModel')

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
const getReviewsByProductId = async (req, res, next) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching reviews" });
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
// @desc Update review
// @route PATCH /api/reviews/:id
// @access User
const updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({
                message: "Review not found"
            });
        }
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,req.body,{ new: true});
        res.status(200).json({review: updatedReview});

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error updating review"
        });
    }
};

// @desc Delete review
// @route DELETE /api/reviews/:id
// @access User
const deleteReview = async(req , res) => {
  try {
    const reviewId = req.params.id
    const review = await Review.findByIdAndDelete(reviewId)
    if(!review){
      return res.status(404).json({
      message: "Review not found"
    })}
    res.status(200).json({msg : "Review deleted successfully" , data : null})
  } catch (error) {
      res.status(500).json({
      message: "Error deletingb review"
        });
  }
}

module.exports = {
  createReview , 
  getReviewsByProductId ,
  getReviewsByUserId , 
  updateReview  ,
  deleteReview
}
