// Product Service
const Product = require("../models/productsModel");

// @desc Get all products
// @route GET /api/products
// @access Public
const getAllProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};

// @desc Get a product by ID
// @route GET /api/products/:id
// @access Public
const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw new Error("Error fetching product");
  }
};

// @desc Create a new product
// @route POST /api/products
// @access Admin
const createProduct = async (productData) => {
  try {
    const product = new Product(productData);
    const savedProduct = await product.save();
    return savedProduct;
  } catch (error) {
    throw new Error("Error creating product");
  }
};

// @desc Update a product
// @route PATCH /api/products/:id
// @access Admin
const updateProduct = async (id, productData) => {
  try {
    const product = await Product.findByIdAndUpdate(id, productData, { new: true });
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw new Error("Error updating product");
  }
};
// @desc Delete a product
// @route DELETE /api/products/:id
// @access Admin
const deleteProduct = async (id) => {
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw new Error("Error deleting product");
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
