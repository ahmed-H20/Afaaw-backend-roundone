const categoryController = require("../controllers/categoryController");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

exports.getAllCategories = asyncHandler(async (req, res) => {
  const categories = await categoryController.findAll();
  res.status(200).json(categories);
});

exports.getCategoryById = asyncHandler(async (req, res) => {
  const category = await categoryController.findById(req.params.id);
  if (!category) {
    throw new ApiError("Category not found", 404);
  }
  res.status(200).json(category);
});

exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await categoryController.create({ name });
  res.status(201).json(category);
});

exports.getAllProductsByCategory = asyncHandler(async (req, res) => {
  const products = await categoryController.findProducts(req.params.id);
  res.status(200).json(products);
});
