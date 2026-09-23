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

const {
  createCartItemSchema,
  cartItemIdSchema,
  cartIdSchema,
  updateCartItemSchema,
} = require("../validations/cartItem.validation");

cartItemRouter.post(
  "/",
  validate(createCartItemSchema),
  createCartItem
);

cartItemRouter.get("/", getAllCartItems);

cartItemRouter.get(
  "/cart/:cartId",
  validate(cartIdSchema),
  getCartItemsByCartId
);

cartItemRouter.get(
  "/:id",
  validate(cartItemIdSchema),
  getCartItemById
);

cartItemRouter.put(
  "/:id",
  validate(updateCartItemSchema),
  updateCartItem
);

cartItemRouter.delete(
  "/:id",
  validate(cartItemIdSchema),
  deleteCartItem
);

module.exports = cartItemRouter;