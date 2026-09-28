const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const protect = require("../middlewares/protect");

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
  itemParams,
} = require("../validations/cart.validations");

// Every route here acts on the caller's own cart - the owner comes from the
// token, so there is no :userId in any path.
router.use(protect);

router.get("/", getCart);
router.delete("/", clearCart);

// Items nest under the cart - a cart item has no meaning outside one.
router.post("/items", validate({ body: addItemSchema }), addItem);
router.put(
  "/items/:itemId",
  validate({ params: itemParams, body: updateQuantitySchema }),
  updateItemQuantity,
);
router.delete("/items/:itemId", validate({ params: itemParams }), removeItem);

module.exports = router;
