const categoryService = require("../services/category.service");
const httpStatusText = require("../constants/httpStatusText");

// @desc Create a new category
// @route POST /api/categories
// @access Admin
const createCategory = async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.status(201).json({
    status: httpStatusText.SUCCESS,
    message: "Category created successfully",
    data: { category },
  });
};

// @desc Get all categories
// @route GET /api/categories
// @access Public
const getAllCategories = async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Categories retrieved successfully",
    data: { categories },
  });
};

// @desc Get category by ID
// @route GET /api/categories/:id
// @access Public
const getCategoryById = async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Category retrieved successfully",
    data: { category },
  });
};

// @desc Update a category
// @route PUT /api/categories/:id
// @access Admin
const updateCategory = async (req, res) => {
  const category = await categoryService.updateCategory(
    req.params.id,
    req.body,
  );
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Category updated successfully",
    data: { category },
  });
};

// @desc Delete a category
// @route DELETE /api/categories/:id
// @access Admin
const deleteCategory = async (req, res) => {
  await categoryService.deleteCategory(req.params.id);
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Category deleted successfully",
    data: null,
  });
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
