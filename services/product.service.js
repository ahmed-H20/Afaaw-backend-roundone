const Product = require("../models/product.model");
const ApiError = require("../utils/ApiError");
const httpStatusText = require("../constants/httpStatusText");

const createProduct = async (data) => {
  return await Product.create(data);
};

const getAllProducts = async () => {
  return await Product.find();
};

const getProductById = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found", httpStatusText.FAIL);
  }

  return product;
};

const updateProduct = async (id, updateData) => {
  const product = await Product.findByIdAndUpdate(id, updateData, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!product) {
    throw new ApiError(404, "Product not found", httpStatusText.FAIL);
  }

  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new ApiError(404, "Product not found", httpStatusText.FAIL);
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
