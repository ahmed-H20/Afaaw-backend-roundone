const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");

const {
  getCart,
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart,
} = require("../controllers/cartController");

const {
  addItemSchema,
  updateQuantitySchema,
  cartParams,
  cartItemParams,
} = require("../validations/cart.validations");

router.get("/:userId", validate({ params: cartParams }), getCart);
router.delete("/:userId", validate({ params: cartParams }), clearCart);

// Items nest under the cart - a cart item has no meaning outside one.
router.post(
  "/:userId/items",
  validate({ params: cartParams, body: addItemSchema }),
  addItem,
);
router.put(
  "/:userId/items/:itemId",
  validate({ params: cartItemParams, body: updateQuantitySchema }),
  updateItemQuantity,
);
router.delete(
  "/:userId/items/:itemId",
  validate({ params: cartItemParams }),
  removeItem,
);

module.exports = router;
