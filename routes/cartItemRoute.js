const express = require("express");
const router = express.Router();
const {
  createCartItemValidation,
  cartItemIdValidation,
  updateCartItemValidation,
} = require("../utils/validations/cartItemValidation");

const {
  createCartItem,
  getAllCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
} = require("../services/cartItemService");

router.post("/", createCartItemValidation, createCartItem);
router.get("/", getAllCartItems);
router.get("/:id", cartItemIdValidation, getCartItemById);
router.put(
  "/:id",
  cartItemIdValidation,
  updateCartItemValidation,
  updateCartItem,
);
router.delete("/:id", cartItemIdValidation, deleteCartItem);

module.exports = router;
