const Category = require("../models/categories");
const AppError = require("../errors/AppError");

// @desc Create a new category
// @route POST /api/categories
// @access Public / Admin
const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get all categories
// @route GET /api/categories
// @access Public
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    res.status(200).json({ categories });
  } catch (error) {
    next(error);
  }
};

// @desc Get a category by ID
// @route GET /api/categories/:id
// @access Public
const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return next(new AppError("Category not found", 404));
    }

    res.status(200).json({ category });
  } catch (error) {
    next(error);
  }
};

// @desc Update a category
// @route PUT /api/categories/:id
// @access Admin
const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!category) {
      return next(new AppError("Category not found", 404));
    }

    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Delete a category
// @route DELETE /api/categories/:id
// @access Admin
const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return next(new AppError("Category not found", 404));
    }

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};