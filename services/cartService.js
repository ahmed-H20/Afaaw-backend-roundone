const Cart = require("../models/cartModel");

// @desc Create a new cart for a user
// @route POST /api/carts
// @access Public
const createCart = async (req, res, next) => {
  try {
    const cart = await Cart.create(req.body);
    res.status(201).json({ message: "Cart created successfully ✅", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating cart❌" });
  }
};

// desc Get all carts
// @route GET /api/carts
// @access Public
const getAllCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find();
    res.status(200).json({ message: "Carts fetched successfully ✅", carts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching carts❌" });
  }
};

// desc Get a cart by id
// @route GET /api/carts/:id
// @access Public
const getCartById = async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.params.id);
    res.status(200).json({ message: "Cart fetched successfully ✅", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cart❌" });
  }
};

// desc Get a cart by user id
// @route GET /api/carts/user/:id
// @access Public
const getCartByUserId = async (req, res, next) => {
  try {
    const cart = await Cart.find({ userId: req.params.id });
    res.status(200).json({ message: "Cart fetched successfully ✅", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cart❌" });
  }
};

// desc Update a cart
// @route PUT /api/carts/:id
// @access Public
const updateCart = async (req, res, next) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Cart updated successfully ✅", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating cart❌" });
  }
};

// desc Delete a cart
// @route DELETE /api/carts/:id
// @access Public
const deleteCart = async (req, res, next) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Cart deleted successfully ✅", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting cart❌" });
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
