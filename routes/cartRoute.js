const express = require("express");

const cartRouter = express.Router();

const {
  createCart,
  getAllCarts,
  getCartById,
  getCartByUserId,
  updateCart,
  deleteCart,
} = require("../services/cartService");

const validate = require("../middlewares/validation.middleware");
const { protect, allowedTo } = require("../middlewares/auth.middleware");

const {
  createCartSchema,
  cartIdSchema,
  userIdSchema,
  updateCartSchema,
} = require("../validations/cart.validation");

// Admin only: view all carts
cartRouter.get("/", protect, allowedTo("admin"), getAllCarts);

// Authenticated user/admin routes
cartRouter.post(
  "/",
  protect,
  validate(createCartSchema),
  createCart
);

cartRouter.get(
  "/user/:userId",
  protect,
  validate(userIdSchema),
  getCartByUserId
);

cartRouter.get(
  "/:id",
  protect,
  validate(cartIdSchema),
  getCartById
);

cartRouter.put(
  "/:id",
  protect,
  validate(updateCartSchema),
  updateCart
);

cartRouter.delete(
  "/:id",
  protect,
  validate(cartIdSchema),
  deleteCart
);

module.exports = cartRouter;