const CartItem = require("../models/cartItemsModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

// @desc Create a new cart item
// @route POST /api/cart-items
// @access Public
const createCartItem = asyncHandler(async (req, res, next) => {
  const cartItem = await CartItem.create(req.body);
  res
    .status(201)
    .json({ message: "Cart item created successfully ✅", cartItem });
});

// desc Get all cart items
// @route GET /api/cart-items
// @access Public
const getAllCartItems = asyncHandler(async (req, res, next) => {
  const cartItems = await CartItem.find();
  res
    .status(200)
    .json({ message: "Cart items fetched successfully ✅", cartItems });
});

// desc Get a cart item by id
// @route GET /api/cart-items/:id
// @access Public
const getCartItemById = asyncHandler(async (req, res, next) => {
  const cartItem = await CartItem.findById(req.params.id);
  if (!cartItem) {
    return next(new ApiError("Cart item not found", 404));
  }
  res
    .status(200)
    .json({ message: "Cart item fetched successfully ✅", cartItem });
});

// desc Update a cart item
// @route PUT /api/cart-items/:id
// @access Public
const updateCartItem = asyncHandler(async (req, res, next) => {
  const cartItem = await CartItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!cartItem) {
    return next(new ApiError("Cart item not found", 404));
  }
  res
    .status(200)
    .json({ message: "Cart item updated successfully ✅", cartItem });
});

// desc Delete a cart item
// @route DELETE /api/cart-items/:id
// @access Public
const deleteCartItem = asyncHandler(async (req, res, next) => {
  const cartItem = await CartItem.findByIdAndDelete(req.params.id);
  if (!cartItem) {
    return next(new ApiError("Cart item not found", 404));
  }
  res
    .status(200)
    .json({ message: "Cart item deleted successfully ✅", cartItem });
});

module.exports = {
  createCartItem,
  getAllCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
};
