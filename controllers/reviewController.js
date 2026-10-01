const reviewService = require("../services/reviewService");

exports.createReview = async (req, res, next) => {
    return reviewService.createReview(req, res, next);
};

exports.getReviewsByProductId = async (req, res, next) => {
    return reviewService.getReviewsByProductId(req, res, next);
};

exports.getReviewsByUserId = async (req, res, next) => {
    return reviewService.getReviewsByUserId(req, res, next);
};
