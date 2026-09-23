const AppError = require("../errors/appError");
const Product = require("../models/productsModel");
const categoryRepository = require("../repository/category.repository")

// @descadd category
// @route POST /api/category
// @access Admin
const addCategory = async (name) => {
    const category = await categoryRepository.addCategory(name);
    return { category, message: "Category added successfully" }
}

// @desc get all categories
// @route GET /api/category
// @access Public
const getAllCategories = async () => {
    const categories = await categoryRepository.getAllCategories();
    return { categories, message: "Categories fetched successfully" }
}

// @desc update category
// @route GET /api/category/:categoryId
// @access Admin

const updateCategory = async (categoryId, name) => {
    isValidId(categoryId, "Category")
    const getCategory = await categoryRepository.getCategoryById(categoryId);
    if (!getCategory)
        throw new AppError("Category not found", 404)
    const category = await categoryRepository.updateCategory(categoryId, name);
    return { category, message: "Category updated successfully" }
}
// @desc delete category
// @route GET /api/category/:categoryId
// @access Admin

const deleteCategory = async (categoryId) => {
    isValidId(categoryId, "Category");
    const getCategory = await categoryRepository.getCategoryById(categoryId);
    if (!getCategory)
        throw new AppError("Category not found", 404)
    await categoryRepository.deleteCategory(categoryId);
    return { message: "Category deleted successfully" }
}
const getProductsByCategory = async (categoryId) => {
    isValidId(categoryId, "Category");
    const getCategory = await categoryRepository.getCategoryById(categoryId);
    if (!getCategory)
        throw new AppError("Category not found", 404)
    const getProducts = await Product.find({ category:categoryId })
    return { products: getProducts, message: "Products fetched successfully" }
}

module.exports = {
    addCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    getProductsByCategory
}