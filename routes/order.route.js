const express = require("express");

const {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");

const router = express.Router();

router
  .route("/")
  .post(createOrder)
  .get(getAllOrders);

router
  .route("/user/:userId")
  .get(getOrdersByUserId);

router
  .route("/:id")
  .get(getOrderById)
  .put(updateOrder)
  .delete(deleteOrder);

module.exports = router;