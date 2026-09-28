const express = require("express");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const {
  getAllCarts,
  getOneCartByUser,
  getCartItems,
  addProduct,
  removeProduct,
  changeProductQuantity,
} = require("../controllers/cartController");
const {
  getCartValidator,
  getCartItemsValidator,
  addProductValidator,
  changeProductQuantityValidator,
  removeProductValidator,
} = require("../utils/validators/cart.validator");

const router = express.Router();

router.get("/", authenticate, authorize("admin"), getAllCarts);
router.get("/cart/:userId", authenticate, getCartValidator, getOneCartByUser);
router.get(
  "/cartItems/:cartId",
  authenticate,
  getCartItemsValidator,
  getCartItems,
);
router.post("/", authenticate, addProductValidator, addProduct);
router.patch(
  "/",
  authenticate,
  changeProductQuantityValidator,
  changeProductQuantity,
);
router.delete("/", authenticate, removeProductValidator, removeProduct);

module.exports = router;
