const productService = require("../services/product.service");
const httpStatusText = require("../constants/httpStatusText");

// @desc Create a new product
// @route POST /api/products
// @access Admin
const createProduct = async (req, res, next) => {
  const product = await productService.createProduct(req.body);
  res.status(201).json({
    status: httpStatusText.SUCCESS,
    message: "Product created successfully",
    data: { product },
  });
};

// @desc Get all products
// @route GET /api/products
// @access Public
const getAllProducts = async (req, res, next) => {
  const products = await productService.getAllProducts();
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Products retrieved successfully",
    data: { products },
  });
};

// @desc Get product by ID
// @route GET /api/products/:id
// @access Public
const getProductById = async (req, res, next) => {
  const product = await productService.getProductById(req.params.id);
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Product retrieved successfully",
    data: { product },
  });
};

// @desc Update a product
// @route PUT /api/products/:id
// @access Admin
const updateProduct = async (req, res, next) => {
  const product = await productService.updateProduct(req.params.id, req.body);
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Product updated successfully",
    data: { product },
  });
};

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Admin
const deleteProduct = async (req, res, next) => {
  await productService.deleteProduct(req.params.id);
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Product deleted successfully",
    data: null,
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
