const express = require("express");
const router = express.Router();
const {
  createCartValidation,
  cartByUserIdValidation,
  cartIdValidation,
} = require("../utils/validations/cartValidation");

const {
  createCart,
  getAllCarts,
  getCartById,
  getCartByUserId,
  updateCart,
  deleteCart,
} = require("../services/cartService");

router.post("/", createCartValidation, createCart);
router.get("/", getAllCarts);
router.get("/user/:userId", cartByUserIdValidation, getCartByUserId);
router.get("/:id", cartIdValidation, getCartById);
router.put("/:id", cartIdValidation, updateCart);
router.delete("/:id", cartIdValidation, deleteCart);

module.exports = router;
