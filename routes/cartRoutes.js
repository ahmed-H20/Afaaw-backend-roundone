const express = require("express");
const router = express.Router();

const {
  getCart,
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart,
} = require("../controllers/cartController");

router.get("/:userId", getCart);
router.delete("/:userId", clearCart);

// Items nest under the cart - a cart item has no meaning outside one.
router.post("/:userId/items", addItem);
router.put("/:userId/items/:itemId", updateItemQuantity);
router.delete("/:userId/items/:itemId", removeItem);

module.exports = router;
