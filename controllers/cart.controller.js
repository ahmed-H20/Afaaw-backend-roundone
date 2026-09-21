const cartService = require("../services/cart.service");

// @desc Create a new cart
// @route POST /api/carts
// @access Public
const createCart = async (req, res) => {
  try {
    const cart = await cartService.createCart(req.body);

    res.status(201).json({
      message: "Cart created successfully",
      cart,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error creating cart",
    });
  }
};

// @desc Get all carts
// @route GET /api/carts
// @access Admin
const getAllCarts = async (req, res) => {
  try {
    const carts = await cartService.getAllCarts();

    res.status(200).json({
      carts,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching carts",
    });
  }
};

// @desc Get cart by ID
// @route GET /api/carts/:id
// @access Public
const getCartById = async (req, res) => {
  try {
    const cart = await cartService.getCartById(req.params.id);

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    res.status(200).json({
      cart,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching cart",
    });
  }
};

// @desc Get cart by user ID
// @route GET /api/carts/user/:userId
// @access Public
const getCartByUserId = async (req, res) => {
  try {
    const cart = await cartService.getCartByUserId(req.params.userId);

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    res.status(200).json({
      cart,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching user cart",
    });
  }
};

// @desc Update a cart
// @route PUT /api/carts/:id
// @access Public
const updateCart = async (req, res) => {
  try {
    const cart = await cartService.updateCart(
      req.params.id,
      req.body
    );

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    res.status(200).json({
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error updating cart",
    });
  }
};

// @desc Delete a cart
// @route DELETE /api/carts/:id
// @access Public
const deleteCart = async (req, res) => {
  try {
    const cart = await cartService.deleteCart(req.params.id);

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    res.status(200).json({
      message: "Cart deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error deleting cart",
    });
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