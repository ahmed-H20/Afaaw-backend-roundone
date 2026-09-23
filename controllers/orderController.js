const orderService = require("../services/orderService");
const catchAsync = require("../utils/catchAsync");

exports.createOrder = catchAsync(async (req, res, next) => {
    return orderService.createOrder(req, res, next);
});

exports.getOrderById = catchAsync(async (req, res, next) => {
    return orderService.getOrderById(req, res, next);
});

exports.updateOrderStatus = catchAsync(async (req, res, next) => {
    return orderService.updateOrderStatus(req, res, next);
});
