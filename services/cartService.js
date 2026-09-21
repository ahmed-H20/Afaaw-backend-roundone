const Cart = require("../models/cartModel");
const CartItem = require("../models/cartItemsModel");
const Product = require("../models/productsModel");

// Helper to build an error the controller can turn into a status code
const httpError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// One cart per user, created on first touch instead of at signup.
// The upsert is atomic, so two concurrent requests can't both insert.
const getOrCreateCart = async (userId) => {
  try {
    return await Cart.findOneAndUpdate(
      { userId },
      { $setOnInsert: { userId } },
      { new: true, upsert: true },
    );
  } catch (error) {
    // Rare race against the unique index: the other request won, so re-read.
    if (error.code === 11000) {
      return await Cart.findOne({ userId });
    }
    throw error;
  }
};

// Look up a cart item, scoped to this user's cart so one user can never
// touch another user's items by guessing an id.
const findOwnedItem = async (userId, itemId) => {
  const cart = await getOrCreateCart(userId);
  const item = await CartItem.findOne({ _id: itemId, cartId: cart._id });
  if (!item) {
    throw httpError("Cart item not found", 404);
  }
  return item;
};

// Get a user's cart with its items and a freshly computed total
const getCart = async (userId) => {
  const cart = await getOrCreateCart(userId);
  const items = await CartItem.find({ cartId: cart._id }).populate(
    "productId",
    "name price stock",
  );

  // Derived on every read - never stored, or it goes stale when a price changes.
  const subtotal = items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0,
  );

  return { cart, items, subtotal, count: items.length };
};

// Add a product to the cart, merging with a matching line if one exists
const addItem = async (userId, { productId, quantity = 1, color, size }) => {
  if (!productId) {
    throw httpError("Product id is required", 400);
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    throw httpError("Quantity must be a whole number of at least 1", 400);
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw httpError("Product not found", 404);
  }

  const cart = await getOrCreateCart(userId);

  // Same product in the same variant is one line, not two.
  const existing = await CartItem.findOne({
    cartId: cart._id,
    productId,
    color,
    size,
  });

  // Stock is checked against the resulting total, not just the added amount.
  const newQuantity = existing ? existing.quantity + quantity : quantity;
  if (newQuantity > product.stock) {
    throw httpError(`Only ${product.stock} left in stock`, 400);
  }

  if (existing) {
    existing.quantity = newQuantity;
    return await existing.save();
  }

  return await CartItem.create({
    cartId: cart._id,
    productId,
    quantity,
    color,
    size,
  });
};

// Set a cart item to an exact quantity
const updateItemQuantity = async (userId, itemId, quantity) => {
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw httpError("Quantity must be a whole number of at least 1", 400);
  }

  const item = await findOwnedItem(userId, itemId);

  const product = await Product.findById(item.productId);
  if (!product) {
    throw httpError("Product not found", 404);
  }

  if (quantity > product.stock) {
    throw httpError(`Only ${product.stock} left in stock`, 400);
  }

  item.quantity = quantity;
  return await item.save();
};

// Remove a single item from the cart
const removeItem = async (userId, itemId) => {
  const item = await findOwnedItem(userId, itemId);
  return await item.deleteOne();
};

// Empty the cart without deleting the cart itself
const clearCart = async (userId) => {
  const cart = await getOrCreateCart(userId);
  const result = await CartItem.deleteMany({ cartId: cart._id });
  return { deletedCount: result.deletedCount };
};

module.exports = {
  getOrCreateCart,
  getCart,
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart,
};
