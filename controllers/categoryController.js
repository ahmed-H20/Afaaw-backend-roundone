const categoryService = require("../services/categoryService");

// @desc Create a new category
// @route POST /api/categories
// @access Admin
const createCategory = async (req, res) => {
  const category = await categoryService.createCategory(req.validated.body);
  res.status(201).json({ message: "Category created successfully", category });
};

// @desc Get all categories
// @route GET /api/categories
// @access Public
const getAllCategories = async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.status(200).json({ categories });
};

// @desc Get a category by ID
// @route GET /api/categories/:id
// @access Public
const getCategoryById = async (req, res) => {
  const category = await categoryService.getCategoryById(
    req.validated.params.id,
  );
  res.status(200).json({ category });
};

// @desc Get all products in a category
// @route GET /api/categories/:id/products
// @access Public
const getProductsByCategory = async (req, res) => {
  const products = await categoryService.getProductsByCategory(
    req.validated.params.id,
  );
  res.status(200).json({ products });
};

// @desc Rename a category
// @route PUT /api/categories/:id
// @access Admin
const updateCategory = async (req, res) => {
  const category = await categoryService.updateCategory(
    req.validated.params.id,
    req.validated.body,
  );
  res.status(200).json({ message: "Category updated successfully", category });
};

// @desc Delete a category
// @route DELETE /api/categories/:id
// @access Admin
const deleteCategory = async (req, res) => {
  await categoryService.deleteCategory(req.validated.params.id);
  res.status(200).json({ message: "Category deleted successfully" });
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  getProductsByCategory,
  updateCategory,
  deleteCategory,
};
