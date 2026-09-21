const CartItem = require("../models/cartItemsModel");

// @desc Create a new cart item
// @route POST /api/cart-items
// @access Public
const createCartItem = async (req, res, next) => {
  try {
    const cartItem = await CartItem.create(req.body);
    res
      .status(201)
      .json({ message: "Cart item created successfully ✅", cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating cart item❌" });
  }
};

// desc Get all cart items
// @route GET /api/cart-items
// @access Public
const getAllCartItems = async (req, res, next) => {
  try {
    const cartItems = await CartItem.find();
    res
      .status(200)
      .json({ message: "Cart items fetched successfully ✅", cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cart items❌" });
  }
};

// desc Get a cart item by id
// @route GET /api/cart-items/:id
// @access Public
const getCartItemById = async (req, res, next) => {
  try {
    const cartItem = await CartItem.findById(req.params.id);
    res
      .status(200)
      .json({ message: "Cart item fetched successfully ✅", cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cart item❌" });
  }
};

// desc Update a cart item
// @route PUT /api/cart-items/:id
// @access Public
const updateCartItem = async (req, res, next) => {
  try {
    const cartItem = await CartItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Cart item updated successfully ✅", cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating cart item❌" });
  }
};

// desc Delete a cart item
// @route DELETE /api/cart-items/:id
// @access Public
const deleteCartItem = async (req, res, next) => {
  try {
    const cartItem = await CartItem.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "Cart item deleted successfully ✅", cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting cart item❌" });
  }
};

module.exports = {
  createCartItem,
  getAllCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
};
