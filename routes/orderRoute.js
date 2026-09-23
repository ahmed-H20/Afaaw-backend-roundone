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

const {
  createOrderSchema,
  orderIdSchema,
  userIdSchema,
  updateOrderSchema,
} = require("../validations/order.validation");

orderRouter.post(
  "/",
  validate(createOrderSchema),
  createOrder
);

orderRouter.get("/", getAllOrders);

orderRouter.get(
  "/user/:userId",
  validate(userIdSchema),
  getOrdersByUserId
);

orderRouter.get(
  "/:id",
  validate(orderIdSchema),
  getOrderById
);

orderRouter.put(
  "/:id",
  validate(updateOrderSchema),
  updateOrder
);

orderRouter.delete(
  "/:id",
  validate(orderIdSchema),
  deleteOrder
);

module.exports = orderRouter;