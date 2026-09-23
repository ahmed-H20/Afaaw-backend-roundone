const express = require("express");

const {
  createCart,
  getAllCarts,
  getCartById,
  getCartByUserId,
  updateCart,
  deleteCart,
} = require("../controllers/cart.controller");
const validate = require("../middleware/validate.middleware");
const {
  createCartSchema,
  cartIdSchema,
  cartUserIdSchema,
  updateCartSchema,
} = require("../validations/cart.validation");

const router = express.Router();

router.route("/").post(validate(createCartSchema), createCart).get(getAllCarts);

router.route("/user/:userId").get(validate(cartUserIdSchema), getCartByUserId);

router
  .route("/:id")
  .get(validate(cartIdSchema), getCartById)
  .put(validate(updateCartSchema), updateCart)
  .delete(validate(cartIdSchema), deleteCart);

module.exports = router;
