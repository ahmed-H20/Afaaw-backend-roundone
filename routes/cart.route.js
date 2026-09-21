const express = require("express");

const {
  createCart,
  getAllCarts,
  getCartById,
  getCartByUserId,
  updateCart,
  deleteCart,
} = require("../controllers/cart.controller");

const router = express.Router();

router
  .route("/")
  .post(createCart)
  .get(getAllCarts);

router
  .route("/user/:userId")
  .get(getCartByUserId);

router
  .route("/:id")
  .get(getCartById)
  .put(updateCart)
  .delete(deleteCart);

module.exports = router;