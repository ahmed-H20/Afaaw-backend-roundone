const express = require("express");

const orderRouter = express.Router();

const {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
} = require("../services/orderService");

const validate = require("../middlewares/validation.middleware");
const { protect, allowedTo } = require("../middlewares/auth.middleware");

const {
  createOrderSchema,
  orderIdSchema,
  userIdSchema,
  updateOrderSchema,
} = require("../validations/order.validation");

// Admin only: view all orders
orderRouter.get("/", protect, allowedTo("admin"), getAllOrders);

// Authenticated user routes
orderRouter.post(
  "/",
  protect,
  validate(createOrderSchema),
  createOrder
);

orderRouter.get(
  "/user/:userId",
  protect,
  validate(userIdSchema),
  getOrdersByUserId
);

orderRouter.get(
  "/:id",
  protect,
  validate(orderIdSchema),
  getOrderById
);

// Admin only: update or delete orders
orderRouter.put(
  "/:id",
  protect,
  allowedTo("admin"),
  validate(updateOrderSchema),
  updateOrder
);

orderRouter.delete(
  "/:id",
  protect,
  allowedTo("admin"),
  validate(orderIdSchema),
  deleteOrder
);

module.exports = orderRouter;