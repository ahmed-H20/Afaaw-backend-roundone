const reviewService = require("../services/reviewService");
const catchAsync = require("../utils/catchAsync");

exports.createReview = catchAsync(async (req, res, next) => {
    return reviewService.createReview(req, res, next);
});

exports.getReviewsByProductId = catchAsync(async (req, res, next) => {
    return reviewService.getReviewsByProductId(req, res, next);
});

exports.getReviewsByUserId = catchAsync(async (req, res, next) => {
    return reviewService.getReviewsByUserId(req, res, next);
});
