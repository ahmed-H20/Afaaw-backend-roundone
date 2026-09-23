const asyncHandler = require("express-async-handler");
const service = require("../services/reviewService");
exports.createReview = asyncHandler(async (req, res) =>
  res
    .status(201)
    .json({
      message: "Review created successfully",
      review: await service.createReview(req.body),
    }),
);
exports.getReviewsByProductId = asyncHandler(async (req, res) =>
  res
    .status(200)
    .json({
      reviews: await service.getReviewsByProductId(req.params.productId),
    }),
);
exports.getReviewsByUserId = asyncHandler(async (req, res) =>
  res
    .status(200)
    .json({ reviews: await service.getReviewsByUserId(req.params.userId) }),
);
