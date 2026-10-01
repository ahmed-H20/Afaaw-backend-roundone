const categoryService = require("../services/categoryService");

exports.createCategory = async (req, res, next) => {
    return categoryService.createCategory(req, res, next);
};

exports.getAllCategories = async (req, res, next) => {
    return categoryService.getAllCategories(req, res, next);
};

exports.getCategoryById = async (req, res, next) => {
    return categoryService.getCategoryById(req, res, next);
};

exports.updateCategory = async (req, res, next) => {
    return categoryService.updateCategory(req, res, next);
};

exports.deleteCategory = async (req, res, next) => {
    return categoryService.deleteCategory(req, res, next);
};
