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

orderRouter.post("/", createOrder);
orderRouter.get("/", getAllOrders);
orderRouter.get("/user/:userId", getOrdersByUserId);
orderRouter.get("/:id", getOrderById);
orderRouter.put("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrder);

module.exports = orderRouter;
