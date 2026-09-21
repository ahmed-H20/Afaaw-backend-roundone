const express = require("express");
const router = express.Router();

const {
  createCart,
  getAllCarts,
  getCartById,
  getCartByUserId,
  updateCart,
  deleteCart,
} = require("../services/cartService");

router.post("/", createCart);
router.get("/", getAllCarts);
router.get("/:id", getCartById);
router.get("/user/:id", getCartByUserId);
router.put("/:id", updateCart);
router.delete("/:id", deleteCart);

module.exports = router;
