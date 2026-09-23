const categoryService = require("../services/categoryService");
const catchAsync = require("../utils/catchAsync");

exports.createCategory = catchAsync(async (req, res, next) => {
    return categoryService.createCategory(req, res, next);
});

exports.getAllCategories = catchAsync(async (req, res, next) => {
    return categoryService.getAllCategories(req, res, next);
});

exports.getCategoryById = catchAsync(async (req, res, next) => {
    return categoryService.getCategoryById(req, res, next);
});

exports.updateCategory = catchAsync(async (req, res, next) => {
    return categoryService.updateCategory(req, res, next);
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
    return categoryService.deleteCategory(req, res, next);
});
