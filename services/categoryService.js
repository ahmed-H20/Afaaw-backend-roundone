const Category = require("../models/categories");
const Product = require("../models/productsModel");
const ApiError = require("../utils/ApiError");

// Turn a duplicate-key error from the unique name index into a 409
const rethrowDuplicate = (error) => {
  if (error.code === 11000) {
    throw ApiError.conflict("A category with this name already exists");
  }
  throw error;
};

// Create a new category
const createCategory = async (data) => {
  try {
    return await Category.create({ name: data.name });
  } catch (error) {
    rethrowDuplicate(error);
  }
};

// Get all categories, alphabetically
const getAllCategories = async () => {
  return await Category.find().sort({ name: 1 });
};

// Get a single category by ID
const getCategoryById = async (id) => {
  const category = await Category.findById(id);
  if (!category) {
    throw ApiError.notFound("Category not found");
  }
  return category;
};

// Get all products in a category
const getProductsByCategory = async (id) => {
  await getCategoryById(id);
  return await Product.find({ category: id });
};

// Rename a category
const updateCategory = async (id, data) => {
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { name: data.name },
      { new: true, runValidators: true },
    );
    if (!category) {
      throw ApiError.notFound("Category not found");
    }
    return category;
  } catch (error) {
    rethrowDuplicate(error);
  }
};

// Delete a category, but only if no product still uses it
const deleteCategory = async (id) => {
  const inUse = await Product.countDocuments({ category: id });
  if (inUse > 0) {
    throw ApiError.conflict(
      `Cannot delete: ${inUse} product(s) still use this category`,
    );
  }

  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw ApiError.notFound("Category not found");
  }
  return category;
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  getProductsByCategory,
  updateCategory,
  deleteCategory,
};
