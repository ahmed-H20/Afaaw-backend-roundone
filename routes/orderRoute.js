const express = require("express");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const {
  getAllOrders,
  getOrderItems,
  getAllOrdersByUser,
  createOrder,
  updateOrderStatus,
  softDeleteOrder,
} = require("../controllers/orderController");
const {
  getOrdersByUserValidator,
  createOrderValidator,
  updateOrderStatusValidator,
  deleteOrderValidator,
} = require("../utils/validators/order.validator");
const {
  getOrderItemsValidator,
} = require("../utils/validators/orderItems.validator");

const router = express.Router();

router.get("/", authenticate, authorize("admin"), getAllOrders);
router.get("/:id", authenticate, getOrdersByUserValidator, getAllOrdersByUser);
router.post("/", authenticate, createOrderValidator, createOrder);
router.get("/:orderId", authenticate, getOrderItemsValidator, getOrderItems);
router.patch(
  "/:id/status",
  authenticate,
  authorize("admin"),
  updateOrderStatusValidator,
  updateOrderStatus,
);
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  deleteOrderValidator,
  softDeleteOrder,
);

module.exports = router;
