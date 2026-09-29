const Cart = require("../models/cartModel");
const AppError = require("../errors/AppError");

// @desc Create a new cart
// @route POST /api/carts
// @access User
const createCart = async (req, res, next) => {
  try {
    const cart = await Cart.create(req.body);

    res.status(201).json({
      message: "Cart created successfully",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get all carts
// @route GET /api/carts
// @access Admin
const getAllCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find();

    res.status(200).json({ carts });
  } catch (error) {
    next(error);
  }
};

// @desc Get a cart by ID
// @route GET /api/carts/:id
// @access User / Admin
const getCartById = async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.params.id);

    if (!cart) {
      return next(new AppError("Cart not found", 404));
    }

    res.status(200).json({ cart });
  } catch (error) {
    next(error);
  }
};

// @desc Get a cart by User ID
// @route GET /api/carts/user/:userId
// @access User / Admin
const getCartByUserId = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      userId: req.params.userId,
    });

    if (!cart) {
      return next(new AppError("Cart not found for this user", 404));
    }

    res.status(200).json({ cart });
  } catch (error) {
    next(error);
  }
};

// @desc Update a cart
// @route PUT /api/carts/:id
// @access User / Admin
const updateCart = async (req, res, next) => {
  try {
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!cart) {
      return next(new AppError("Cart not found", 404));
    }

    res.status(200).json({
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Delete a cart
// @route DELETE /api/carts/:id
// @access User / Admin
const deleteCart = async (req, res, next) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);

    if (!cart) {
      return next(new AppError("Cart not found", 404));
    }

    res.status(200).json({
      message: "Cart deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCart,
  getAllCarts,
  getCartById,
  getCartByUserId,
  updateCart,
  deleteCart,
};