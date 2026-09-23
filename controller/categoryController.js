const asyncHandler = require("express-async-handler");
const categoryService = require("../services/categoryService");

const addCategory = asyncHandler(async (req, res, next) => {
    const { name } = req.body;
    const { category, message } = await categoryService.addCategory(name);
    res.status(201).json({ success: true, message, category });
})
const getAllCategories = asyncHandler(async (req, res, next) => {
    const { categories, message } = await categoryService.getAllCategories();
    res.status(200).json({ success: true, message, data: categories });
})
const updateCategory = asyncHandler(async (req, res, next) => {
    const { name } = req.body;
    const { categoryId } = req.params;
    const { category, message } = await categoryService.updateCategory(categoryId, name);
    res.status(200).json({ success: true, message, category });
})
const deleteCategory = asyncHandler(async (req, res, next) => {
    const { categoryId } = req.params;
    const { category, message } = await categoryService.deleteCategory(categoryId);
    res.status(200).json({ success: true, message });
})
const getProductsByCategory = asyncHandler(async (req, res, next) => {
    const { categoryId } = req.params;
    const { products, message } = await categoryService.getProductsByCategory(categoryId);
    res.status(200).json({ success: true, message, data: products });
})

module.exports = {
    addCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    getProductsByCategory
}