// Product Service
import Product from "../models/product.model.js";
import AppError from "../errors/app-error.js";

// @desc Get all products
// @route GET /api/products
// @access Public
const getAllProducts = async () => {
  return Product.find().lean();
};

// @desc Get a product by ID
// @route GET /api/products/:id
// @access Public
const getProductById = async (id) => {
  const product = await Product.findById(id).lean();
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  return product;
};

// @desc Create a new product
// @route POST /api/products
// @access Admin
const createProduct = async (productData) => {
  const product = new Product(productData);
  return product.save();
};

// @desc Update a product
// @route PATCH /api/products/:id
// @access Admin
const updateProduct = async (id, productData) => {
  const product = await Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  }).lean();
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  return product;
};
// @desc Delete a product
// @route DELETE /api/products/:id
// @access Admin
const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id).lean();
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  return product;
};

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
