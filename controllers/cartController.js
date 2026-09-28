const cartService = require("../services/cartService");

// The owner comes from the verified token, never the URL - a client cannot
// act on someone else's cart.
const getUserId = (req) => req.user.id;

// @desc Get the current user's cart with its items and subtotal
// @route GET /api/carts
// @access User
const getCart = async (req, res) => {
  const cart = await cartService.getCart(getUserId(req));
  res.status(200).json(cart);
};

// @desc Add a product to the cart
// @route POST /api/carts/items
// @access User
const addItem = async (req, res) => {
  const item = await cartService.addItem(getUserId(req), req.validated.body);
  res.status(201).json({ message: "Item added to cart", item });
};

// @desc Set a cart item to an exact quantity
// @route PUT /api/carts/items/:itemId
// @access User
const updateItemQuantity = async (req, res) => {
  const item = await cartService.updateItemQuantity(
    getUserId(req),
    req.validated.params.itemId,
    req.validated.body.quantity,
  );
  res.status(200).json({ message: "Cart item updated", item });
};

// @desc Remove a single item from the cart
// @route DELETE /api/carts/items/:itemId
// @access User
const removeItem = async (req, res) => {
  await cartService.removeItem(getUserId(req), req.validated.params.itemId);
  res.status(200).json({ message: "Item removed from cart" });
};

// @desc Empty the cart
// @route DELETE /api/carts
// @access User
const clearCart = async (req, res) => {
  const { deletedCount } = await cartService.clearCart(getUserId(req));
  res.status(200).json({ message: "Cart cleared", deletedCount });
};

module.exports = {
  getCart,
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart,
};
