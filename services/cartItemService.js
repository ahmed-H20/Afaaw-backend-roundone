const CartItem = require("../models/cartItemsModel");
const AppError = require("../errors/AppError");

// @desc Create a new cart item
// @route POST /api/cart-items
// @access User
const createCartItem = async (req, res, next) => {
  try {
    const cartItem = await CartItem.create(req.body);

    res.status(201).json({
      message: "Cart item created successfully",
      cartItem,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get all cart items
// @route GET /api/cart-items
// @access Admin
const getAllCartItems = async (req, res, next) => {
  try {
    const cartItems = await CartItem.find();

    res.status(200).json({ cartItems });
  } catch (error) {
    next(error);
  }
};

// @desc Get a cart item by ID
// @route GET /api/cart-items/:id
// @access User / Admin
const getCartItemById = async (req, res, next) => {
  try {
    const cartItem = await CartItem.findById(req.params.id);

    if (!cartItem) {
      return next(new AppError("Cart item not found", 404));
    }

    res.status(200).json({ cartItem });
  } catch (error) {
    next(error);
  }
};

// @desc Get cart items by Cart ID
// @route GET /api/cart-items/cart/:cartId
// @access User / Admin
const getCartItemsByCartId = async (req, res, next) => {
  try {
    const cartItems = await CartItem.find({
      cartId: req.params.cartId,
    });

    res.status(200).json({ cartItems });
  } catch (error) {
    next(error);
  }
};

// @desc Update a cart item
// @route PUT /api/cart-items/:id
// @access User / Admin
const updateCartItem = async (req, res, next) => {
  try {
    const cartItem = await CartItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!cartItem) {
      return next(new AppError("Cart item not found", 404));
    }

    res.status(200).json({
      message: "Cart item updated successfully",
      cartItem,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Delete a cart item
// @route DELETE /api/cart-items/:id
// @access User / Admin
const deleteCartItem = async (req, res, next) => {
  try {
    const cartItem = await CartItem.findByIdAndDelete(req.params.id);

    if (!cartItem) {
      return next(new AppError("Cart item not found", 404));
    }

    res.status(200).json({
      message: "Cart item deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCartItem,
  getAllCartItems,
  getCartItemById,
  getCartItemsByCartId,
  updateCartItem,
  deleteCartItem,
};