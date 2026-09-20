const Cart = require("../models/cartModel");

// @desc Create a new cart
// @route POST /api/carts
// @access User
const createCart = async (req, res, next) => {
  try {
    const cart = await Cart.create(req.body);
    res.status(201).json({ message: "Cart created successfully", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating cart" });
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
    console.error(error);
    res.status(500).json({ message: "Error fetching carts" });
  }
};

// @desc Get a cart by ID
// @route GET /api/carts/:id
// @access User / Admin
const getCartById = async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cart" });
  }
};

// @desc Get a cart by User ID
// @route GET /api/carts/user/:userId
// @access User / Admin
const getCartByUserId = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }
    res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cart" });
  }
};

// @desc Update a cart
// @route PUT /api/carts/:id
// @access User / Admin
const updateCart = async (req, res, next) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ message: "Cart updated successfully", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating cart" });
  }
};

// @desc Delete a cart
// @route DELETE /api/carts/:id
// @access User / Admin
const deleteCart = async (req, res, next) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting cart" });
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
