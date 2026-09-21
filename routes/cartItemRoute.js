const express = require("express");
const router = express.Router();

const {
  createCartItem,
  getAllCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
} = require("../services/cartItemService");

router.post("/", createCartItem);
router.get("/", getAllCartItems);
router.get("/:id", getCartItemById);
router.put("/:id", updateCartItem);
router.delete("/:id", deleteCartItem);

module.exports = router;
