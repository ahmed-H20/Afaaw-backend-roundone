const express = require("express");

const cartItemRouter = express.Router();

const {
  createCartItem,
  getAllCartItems,
  getCartItemById,
  getCartItemsByCartId,
  updateCartItem,
  deleteCartItem,
} = require("../services/cartItemService");

const validate = require("../middlewares/validation.middleware");
const { protect, allowedTo } = require("../middlewares/auth.middleware");

const {
  createCartItemSchema,
  cartItemIdSchema,
  cartIdSchema,
  updateCartItemSchema,
} = require("../validations/cartItem.validation");

// Admin only: view all cart items
cartItemRouter.get(
  "/",
  protect,
  allowedTo("admin"),
  getAllCartItems
);

// Authenticated user/admin routes
cartItemRouter.post(
  "/",
  protect,
  validate(createCartItemSchema),
  createCartItem
);

cartItemRouter.get(
  "/cart/:cartId",
  protect,
  validate(cartIdSchema),
  getCartItemsByCartId
);

cartItemRouter.get(
  "/:id",
  protect,
  validate(cartItemIdSchema),
  getCartItemById
);

cartItemRouter.put(
  "/:id",
  protect,
  validate(updateCartItemSchema),
  updateCartItem
);

cartItemRouter.delete(
  "/:id",
  protect,
  validate(cartItemIdSchema),
  deleteCartItem
);

module.exports = cartItemRouter;