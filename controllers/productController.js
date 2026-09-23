const productService = require("../services/productService");
const catchAsync = require("../utils/catchAsync");

exports.createProduct = catchAsync(async (req, res, next) => {
    return productService.createProduct(req, res, next);
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
    return productService.getAllProducts(req, res, next);
});

exports.getProductById = catchAsync(async (req, res, next) => {
    return productService.getProductById(req, res, next);
});

exports.updateProduct = catchAsync(async (req, res, next) => {
    return productService.updateProduct(req, res, next);
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
    return productService.deleteProduct(req, res, next);
});
