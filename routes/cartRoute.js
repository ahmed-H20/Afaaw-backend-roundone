const express = require("express");
const router = express.Router();

const {
    createCart,
    addItemToCart,
    getCartByUserId,
    removeItem,
    updateItem,
} = require("../controllers/cartController");

router.post("/", createCart);
router.post("/:cartId/items", addItemToCart);
router.get("/user/:userId", getCartByUserId);
router.delete("/items/:itemId", removeItem);
router.put("/items/:itemId", updateItem);

module.exports = router;
