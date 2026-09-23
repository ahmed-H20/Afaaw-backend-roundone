const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const {
    createCartValidation,
    cartIdValidation,
    cartItemIdValidation,
    addItemToCartValidation,
    updateCartItemValidation,
} = require("../utils/validators/cartValidator");

const {
    createCart,
    addItemToCart,
    getCartByUserId,
    removeItem,
    updateItem,
} = require("../controllers/cartController");

router.post("/", createCartValidation, validate, createCart);
router.post("/:cartId/items", cartIdValidation, addItemToCartValidation, validate, addItemToCart);
router.get("/user/:userId", createCartValidation, validate, getCartByUserId);
router.delete("/items/:itemId", cartItemIdValidation, validate, removeItem);
router.put("/items/:itemId", cartItemIdValidation, updateCartItemValidation, validate, updateItem);
