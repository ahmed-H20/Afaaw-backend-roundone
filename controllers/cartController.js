const cartService = require("../services/cartService");
const catchAsync = require("../utils/catchAsync");

exports.createCart = catchAsync(async (req, res, next) => {
    return cartService.createCart(req, res, next);
});

exports.addItemToCart = catchAsync(async (req, res, next) => {
    return cartService.addItemToCart(req, res, next);
});

exports.getCartByUserId = catchAsync(async (req, res, next) => {
    return cartService.getCartByUserId(req, res, next);
});

exports.removeItem = catchAsync(async (req, res, next) => {
    return cartService.removeItem(req, res, next);
});

exports.updateItem = catchAsync(async (req, res, next) => {
    return cartService.updateItem(req, res, next);
});
