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

cartItemRouter.post("/", createCartItem);
cartItemRouter.get("/", getAllCartItems);
cartItemRouter.get("/cart/:cartId", getCartItemsByCartId);
cartItemRouter.get("/:id", getCartItemById);
cartItemRouter.put("/:id", updateCartItem);
cartItemRouter.delete("/:id", deleteCartItem);

module.exports = cartItemRouter;
