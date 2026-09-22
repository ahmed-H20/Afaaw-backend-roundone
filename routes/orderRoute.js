const express = require("express");
const {
  getAllOrders,
  getOrderItems,
  getAllOrdersByUser,
  createOrder,
  updateOrderStatus,
  softDeleteOrder,
} = require("../services/orderService");
const {
  getOrdersByUserValidator,
  createOrderValidator,
  updateOrderStatusValidator,
  deleteOrderValidator,
} = require("../utils/validators/order.validator");
const { getOrderItemsValidator } = require("../utils/validators/orderItems.validator");

const router = express.Router();

router.get("/", getAllOrders);
router.get("/:id", getOrdersByUserValidator, getAllOrdersByUser);
router.post("/", createOrderValidator, createOrder);
router.get("/:orderId", getOrderItemsValidator, getOrderItems);
router.patch("/:id/status", updateOrderStatusValidator, updateOrderStatus);
router.delete("/:id", deleteOrderValidator, softDeleteOrder);

module.exports = router;
