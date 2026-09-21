const categoryService = require("../services/category.service");

// @desc Create a new category
// @route POST /api/categories
// @access Admin
const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error creating category",
    });
  }
};

// @desc Get all categories
// @route GET /api/categories
// @access Public
const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();

    res.status(200).json({
      categories,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching categories",
    });
  }
};

// @desc Get category by ID
// @route GET /api/categories/:id
// @access Public
const getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      category,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching category",
    });
  }
};

// @desc Update a category
// @route PUT /api/categories/:id
// @access Admin
const updateCategory = async (req, res) => {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body,
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error updating category",
    });
  }
};

// @desc Delete a category
// @route DELETE /api/categories/:id
// @access Admin
const deleteCategory = async (req, res) => {
  try {
    const category = await categoryService.deleteCategory(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error deleting category",
    });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
