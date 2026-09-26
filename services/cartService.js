const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

// @desc Create a new cart for a user
// @route POST /api/carts
// @access Public
const createCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.create(req.body);
  res.status(201).json({ message: "Cart created successfully ✅", cart });
});

// desc Get all carts
// @route GET /api/carts
// @access Public
const getAllCarts = asyncHandler(async (req, res, next) => {
  const carts = await Cart.find();
  res.status(200).json({ message: "Carts fetched successfully ✅", carts });
});

// desc Get a cart by id
// @route GET /api/carts/:id
// @access Public
const getCartById = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findById(req.params.id);
  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }
  res.status(200).json({ message: "Cart fetched successfully ✅", cart });
});

// desc Get a cart by user id
// @route GET /api/carts/user/:id
// @access Public
const getCartByUserId = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }
  res.status(200).json({ message: "Cart fetched successfully ✅", cart });
});

// desc Update a cart
// @route PUT /api/carts/:id
// @access Public
const updateCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }
  res.status(200).json({ message: "Cart updated successfully ✅", cart });
});

// desc Delete a cart
// @route DELETE /api/carts/:id
// @access Public
const deleteCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findByIdAndDelete(req.params.id);
  if (!cart) {
    return next(new ApiError("Cart not found", 404));
  }
  res.status(200).json({ message: "Cart deleted successfully ✅", cart });
});

module.exports = {
  createCart,
  getAllCarts,
  getCartById,
  getCartByUserId,
  updateCart,
  deleteCart,
};
