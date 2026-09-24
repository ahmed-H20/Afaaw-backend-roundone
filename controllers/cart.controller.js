const cartService = require("../services/cart.service");
const httpStatusText = require("../constants/httpStatusText");

// @desc Create a new cart
// @route POST /api/carts
// @access Public
const createCart = async (req, res) => {
  const cart = await cartService.createCart(req.body);
  res.status(201).json({
    status: httpStatusText.SUCCESS,
    message: "Cart created successfully",
    data: { cart },
  });
};

// @desc Get all carts
// @route GET /api/carts
// @access Admin
const getAllCarts = async (req, res) => {
  const carts = await cartService.getAllCarts();
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Carts retrieved successfully",
    data: { carts },
  });
};

// @desc Get cart by ID
// @route GET /api/carts/:id
// @access Public
const getCartById = async (req, res) => {
  const cart = await cartService.getCartById(req.params.id);
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Cart retrieved successfully",
    data: { cart },
  });
};

// @desc Get cart by user ID
// @route GET /api/carts/user/:userId
// @access Public
const getCartByUserId = async (req, res) => {
  const cart = await cartService.getCartByUserId(req.params.userId);
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Cart retrieved successfully",
    data: { cart },
  });
};

// @desc Update cart
// @route PUT /api/carts/:id
// @access Public
const updateCart = async (req, res) => {
  const cart = await cartService.updateCart(req.params.id, req.body);
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Cart updated successfully",
    data: { cart },
  });
};

// @desc Delete cart
// @route DELETE /api/carts/:id
// @access Public
const deleteCart = async (req, res) => {
  await cartService.deleteCart(req.params.id);
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Cart deleted successfully",
    data: null,
  });
};

module.exports = {
  createCart,
  getAllCarts,
  getCartById,
  getCartByUserId,
  updateCart,
  deleteCart,
};
