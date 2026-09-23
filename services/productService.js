const Product = require("../models/productsModel");
const ApiError = require("../utils/ApiError");

// @desc Create a new product
// @route POST /api/products
// @access Admin
const createProduct = (data) => Product.create(data);

// @desc Get all products
// @route GET /api/products
// @access Public
const getAllProducts = () => Product.find();

// @desc Get a product by ID
// @route GET /api/products/:id
// @access Public
const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new ApiError("Product not found", 404);
  return product;
};

// @desc Update a product
// @route PUT /api/products/:id
// @access Admin
const updateProduct = async (id, data) => {
  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!product) throw new ApiError("Product not found", 404);
  return product;
};

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Admin
const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new ApiError("Product not found", 404);
  return { message: "Product deleted successfully" };
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
