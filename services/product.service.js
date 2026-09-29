// Product Service
import Product from "../models/product.model.js";
import { Categories } from "../models/category.model.js";
import { CartItem } from "../models/cart-items.model.js";
import { OrderItem } from "../models/order-items.model.js";
import { Review } from "../models/review.model.js";
import AppError from "../errors/app-error.js";

const ensureCategoryExists = async (categoryId) => {
  if (categoryId && !(await Categories.exists({ _id: categoryId }))) {
    throw new AppError("Category not found", 404);
  }
};

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
  await ensureCategoryExists(productData.category);
  const product = new Product(productData);
  return product.save();
};

// @desc Update a product
// @route PATCH /api/products/:id
// @access Admin
const updateProduct = async (id, productData) => {
  await ensureCategoryExists(productData.category);
  const product = await Product.findByIdAndUpdate(id, productData, {
    returnDocument: "after",
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
  const [cartItem, orderItem, review] = await Promise.all([
    CartItem.exists({ productId: id }),
    OrderItem.exists({ productId: id }),
    Review.exists({ productId: id }),
  ]);
  if (cartItem || orderItem || review) {
    throw new AppError("Product is referenced by cart items, orders, or reviews", 409);
  }

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
