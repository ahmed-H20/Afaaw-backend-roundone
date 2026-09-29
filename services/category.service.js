const Category = require("../models/category.model");
const ApiError = require("../utils/ApiError");
const httpStatusText = require("../constants/httpStatusText");

const createCategory = async (data) => {
  return await Category.create(data);
};

const getAllCategories = async () => {
  return await Category.find();
};

const getCategoryById = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(404, "Category not found", httpStatusText.FAIL);
  }

  return category;
};

const updateCategory = async (id, updateData) => {
  const category = await Category.findByIdAndUpdate(id, updateData, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!category) {
    throw new ApiError(404, "Category not found", httpStatusText.FAIL);
  }

  return category;
};

const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    throw new ApiError(404, "Category not found", httpStatusText.FAIL);
  }

  return category;
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
