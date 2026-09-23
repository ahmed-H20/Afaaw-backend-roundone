const express = require("express");
const router = express.Router();

const { getCart, addCartItem, getAllCarts, deleteCartItem, updateCartItem } = require("../controller/cartController");
const { updateCartItemValidation, getAllCartsQueryValidation } = require("../utils/validation/cart.validation");

router.get("/all", getAllCartsQueryValidation, getAllCarts);
router.get("/:userId", getCart);


router.post("/items/add", addCartItem);
router.delete("/items/:cartItemId", deleteCartItem);
router.patch("/items/:cartItemId", updateCartItemValidation,updateCartItem )


module.exports = router;