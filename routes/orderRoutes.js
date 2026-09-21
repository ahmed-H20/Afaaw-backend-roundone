const express = require("express");
const router = express.Router();

const {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

// Admin
router.get("/", getAllOrders);
router.patch("/:orderId/status", updateOrderStatus);

// User
router.post("/:userId", createOrder);
router.get("/:userId", getUserOrders);
router.get("/:userId/:orderId", getOrderById);
router.patch("/:userId/:orderId/cancel", cancelOrder);

module.exports = router;
