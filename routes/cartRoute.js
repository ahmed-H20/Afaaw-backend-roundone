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

const {
  createCartSchema,
  cartIdSchema,
  userIdSchema,
  updateCartSchema,
} = require("../validations/cart.validation");

cartRouter.post(
  "/",
  validate(createCartSchema),
  createCart
);

cartRouter.get("/", getAllCarts);

cartRouter.get(
  "/user/:userId",
  validate(userIdSchema),
  getCartByUserId
);

cartRouter.get(
  "/:id",
  validate(cartIdSchema),
  getCartById
);

cartRouter.put(
  "/:id",
  validate(updateCartSchema),
  updateCart
);

cartRouter.delete(
  "/:id",
  validate(cartIdSchema),
  deleteCart
);

module.exports = cartRouter;