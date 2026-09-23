const ProductItem = require("../models/productItemsModel");
const AppError = require("../errors/AppError");

// @desc Create a new product item
// @route POST /api/product-items
// @access Admin
const createProductItem = async (req, res, next) => {
  try {
    const productItem = await ProductItem.create(req.body);

    res.status(201).json({
      message: "Product item created successfully",
      productItem,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get all product items
// @route GET /api/product-items
// @access Public
const getAllProductItems = async (req, res, next) => {
  try {
    const productItems = await ProductItem.find();

    res.status(200).json({ productItems });
  } catch (error) {
    next(error);
  }
};

// @desc Get a product item by ID
// @route GET /api/product-items/:id
// @access Public
const getProductItemById = async (req, res, next) => {
  try {
    const productItem = await ProductItem.findById(req.params.id);

    if (!productItem) {
      return next(new AppError("Product item not found", 404));
    }

    res.status(200).json({ productItem });
  } catch (error) {
    next(error);
  }
};

// @desc Get product items by Product ID
// @route GET /api/product-items/product/:productId
// @access Public
const getProductItemsByProductId = async (req, res, next) => {
  try {
    const productItems = await ProductItem.find({
      productId: req.params.productId,
    });

    res.status(200).json({ productItems });
  } catch (error) {
    next(error);
  }
};

// @desc Update a product item
// @route PUT /api/product-items/:id
// @access Admin
const updateProductItem = async (req, res, next) => {
  try {
    const productItem = await ProductItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!productItem) {
      return next(new AppError("Product item not found", 404));
    }

    res.status(200).json({
      message: "Product item updated successfully",
      productItem,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Delete a product item
// @route DELETE /api/product-items/:id
// @access Admin
const deleteProductItem = async (req, res, next) => {
  try {
    const productItem = await ProductItem.findByIdAndDelete(req.params.id);

    if (!productItem) {
      return next(new AppError("Product item not found", 404));
    }

    res.status(200).json({
      message: "Product item deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProductItem,
  getAllProductItems,
  getProductItemById,
  getProductItemsByProductId,
  updateProductItem,
  deleteProductItem,
};