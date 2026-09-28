const service = require("../services/reviewService");
exports.createReview = async (req, res) =>
  res
    .status(201)
    .json({
      message: "Review created successfully",
      review: await service.createReview(req.body),
    });
exports.getReviewsByProductId = async (req, res) =>
  res
    .status(200)
    .json({
      reviews: await service.getReviewsByProductId(req.params.productId),
    });
exports.getReviewsByUserId = async (req, res) =>
  res
    .status(200)
    .json({ reviews: await service.getReviewsByUserId(req.params.userId) });
