const Product = require("../models/productsModel");

// Helper to build an error the controller can turn into a status code
const httpError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// Create a new product
const createProduct = async (data) => {
  return await Product.create(data);
};

// Get all products
const getAllProducts = async () => {
  return await Product.find();
};

// Get a single product by ID
const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw httpError("Product not found", 404);
  }
  return product;
};

// Update a product by ID
const updateProduct = async (id, data) => {
  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw httpError("Product not found", 404);
  }
  return product;
};

// Delete a product by ID
const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw httpError("Product not found", 404);
  }
  return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
