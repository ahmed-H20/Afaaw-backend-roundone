const express = require("express");
const {
  getAllCarts,
  getOneCartByUser,
  getCartItems,
  addProduct,
  removeProduct,
  changeProductQuantity,
} = require("../services/cartService");
const {
  getCartValidator,
  getCartItemsValidator,
  addProductValidator,
  changeProductQuantityValidator,
  removeProductValidator,
} = require("../utils/validators/cart.validator");

const router = express.Router();

router.get("/", getAllCarts);
router.get("/cart/:userId", getCartValidator, getOneCartByUser);
router.get("/cartItems/:cartId", getCartItemsValidator, getCartItems);
router.post("/", addProductValidator, addProduct);
router.patch("/", changeProductQuantityValidator, changeProductQuantity);
router.delete("/", removeProductValidator, removeProduct);

module.exports = router;
