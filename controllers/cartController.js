const cartService = require("../services/cartService");

// TODO: once auth middleware exists, take the user from req.user.id
// instead of the URL so a client can't act on someone else's cart.
const getUserId = (req) => req.params.userId;

// @desc Get the current user's cart with its items and subtotal
// @route GET /api/carts/:userId
// @access User
const getCart = async (req, res) => {
  try {
    const cart = await cartService.getCart(getUserId(req));
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "Error fetching cart",
    });
  }
};

// @desc Add a product to the cart
// @route POST /api/carts/:userId/items
// @access User
const addItem = async (req, res) => {
  try {
    const item = await cartService.addItem(getUserId(req), req.body);
    res.status(201).json({ message: "Item added to cart", item });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "Error adding item to cart",
    });
  }
};

// @desc Set a cart item to an exact quantity
// @route PUT /api/carts/:userId/items/:itemId
// @access User
const updateItemQuantity = async (req, res) => {
  try {
    const item = await cartService.updateItemQuantity(
      getUserId(req),
      req.params.itemId,
      req.body.quantity,
    );
    res.status(200).json({ message: "Cart item updated", item });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "Error updating cart item",
    });
  }
};

// @desc Remove a single item from the cart
// @route DELETE /api/carts/:userId/items/:itemId
// @access User
const removeItem = async (req, res) => {
  try {
    await cartService.removeItem(getUserId(req), req.params.itemId);
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "Error removing cart item",
    });
  }
};

// @desc Empty the cart
// @route DELETE /api/carts/:userId
// @access User
const clearCart = async (req, res) => {
  try {
    const { deletedCount } = await cartService.clearCart(getUserId(req));
    res.status(200).json({ message: "Cart cleared", deletedCount });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({
      message: error.statusCode ? error.message : "Error clearing cart",
    });
  }
};

module.exports = {
  getCart,
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart,
};
