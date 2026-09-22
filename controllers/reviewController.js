const Review = require("../models/reviewsModel");

exports.create = (data) => Review.create(data);
exports.findByProductId = (productId) => Review.find({ productId });
exports.findByUserId = (userId) => Review.find({ userId });
