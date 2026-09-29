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
const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const {
  createCartSchema,
  cartIdSchema,
  cartUserIdSchema,
  updateCartSchema,
} = require("../validations/cart.validation");

const router = express.Router();

router
  .route("/")
  .post(protect, validate(createCartSchema), createCart)
  .get(protect, getAllCarts);

router
  .route("/user/:userId")
  .get(
    protect,
    validate(cartUserIdSchema),
    getCartByUserId,
  );

router
  .route("/:id")
  .get(protect, validate(cartIdSchema), getCartById)
  .put(protect, validate(updateCartSchema), updateCart)
  .delete(protect, validate(cartIdSchema), deleteCart);

module.exports = router;
