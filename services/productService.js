const productController = require("../controllers/productController");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

// @desc Create a new product
// @route POST /api/products
// @access Admin
const createProduct = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const product = await productController.create(req.body);
  res.status(201).json({ message: "Product created successfully", product });
});

// @desc Get all products
// @route GET /api/products
// @access Public
const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await productController.findAll();
  res.status(200).json({ products });
});

// @desc Get a product by ID
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res, next) => {
  const product = await productController.findById(req.params.id);
  if (!product) {
    throw new ApiError("Product not found", 404);
  }
  res.status(200).json({ product });
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Admin
const updateProduct = asyncHandler(async (req, res, next) => {
  const product = await productController.updateById(req.params.id, req.body);
  if (!product) {
    throw new ApiError("Product not found", 404);
  }
  res.status(200).json({ message: "Product updated successfully", product });
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Admin
const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await productController.deleteById(req.params.id);
  if (!product) {
    throw new ApiError("Product not found", 404);
  }
  res.status(200).json({ message: "Product deleted successfully" });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
