const Product = require("../models/productsModel");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

// @desc Create a new product
// @route POST /api/products
// @access Admin
const createProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ message: "Product created successfully", product });
});

// @desc Get all products
// @route GET /api/products
// @access Public
const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({ products });
});

// @desc Get a product by ID
// @route GET /api/products/:id
// @access Public
const getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ApiError(404, "Product not found"));
  }

  return res.status(200).json({ product });
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Admin
const updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new ApiError(404, "Product not found"));
  }

  return res.status(200).json({ message: "Product updated successfully", product });
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Admin
const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new ApiError(404, "Product not found"));
  }

  return res.status(200).json({ message: "Product deleted successfully" });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
