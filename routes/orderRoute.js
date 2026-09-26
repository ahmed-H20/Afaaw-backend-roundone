const express = require("express");
const router = express.Router();
const {
  createOrderValidation,
  orderIdValidation,
  updateOrderValidation,
} = require("../utils/validations/orderValidation");

const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../services/orderService");

router.post("/", createOrderValidation, createOrder);
router.get("/", getAllOrders);
router.get("/:id", orderIdValidation, getOrderById);
router.put("/:id", orderIdValidation, updateOrderValidation, updateOrder);
router.delete("/:id", orderIdValidation, deleteOrder);

module.exports = router;
