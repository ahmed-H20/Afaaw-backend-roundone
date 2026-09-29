const Product = require("../models/productsModel");
const AppError = require("../errors/AppError");

// @desc Create a new product
// @route POST /api/products
// @access Admin
const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get all products
// @route GET /api/products
// @access Public
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
};

// @desc Get a product by ID
// @route GET /api/products/:id
// @access Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    res.status(200).json({ product });
  } catch (error) {
    next(error);
  }
};

// @desc Update a product
// @route PUT /api/products/:id
// @access Admin
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Admin
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};