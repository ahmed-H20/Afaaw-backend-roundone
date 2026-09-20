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

cartRouter.post("/", createCart);
cartRouter.get("/", getAllCarts);
cartRouter.get("/user/:userId", getCartByUserId);
cartRouter.get("/:id", getCartById);
cartRouter.put("/:id", updateCart);
cartRouter.delete("/:id", deleteCart);

module.exports = cartRouter;
