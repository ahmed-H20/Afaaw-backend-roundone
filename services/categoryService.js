const Category = require("../models/categories");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

// @desc Create a new category
// @route POST /api/categories
// @access Admin
const createCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.create(req.body);
  res
    .status(201)
    .json({ message: "Category created successfully ✅", category });
});

// @desc Get all categories
// @route GET /api/categories
// @access Public
const getAllCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({ categories });
});

// @desc Get a category by id
// @route GET /api/categories/:id
// @access Public
const getCategoryById = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ApiError("Category not found", 404));
  }
  res.status(200).json({ category });
});

// @desc Update a category
// @route PUT /api/categories/:id
// @access Admin
const updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!category) {
    return next(new ApiError("Category not found", 404));
  }
  res
    .status(200)
    .json({ message: "Category updated successfully ✅", category });
});

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
};
