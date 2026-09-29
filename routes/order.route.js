const express = require("express");

const {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");
const validate = require("../middleware/validate.middleware");
const {
  createOrderSchema,
  updateOrderSchema,
  orderIdSchema,
  orderUserIdSchema,
} = require("../validations/order.validation");
const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const roles = require("../constants/roles");

const router = express.Router();

router
  .route("/")
  .post(protect, validate(createOrderSchema), createOrder)
  .get(protect, getAllOrders);

router
  .route("/user/:userId")
  .get(
    protect,
    authorize(roles.ADMIN),
    validate(orderUserIdSchema),
    getOrdersByUserId,
  );

router
  .route("/:id")
  .get(protect, validate(orderIdSchema), getOrderById)
  .put(
    protect,
    authorize(roles.ADMIN),
    validate(updateOrderSchema),
    updateOrder,
  )
  .delete(
    protect,
    authorize(roles.ADMIN),
    validate(orderIdSchema),
    deleteOrder,
  );

module.exports = router;
