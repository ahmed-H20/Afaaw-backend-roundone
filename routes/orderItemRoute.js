const express = require("express");
const router = express.Router();

const {
  createOrderItem,
  getAllOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
} = require("../services/orderItemService");

router.post("/", createOrderItem);
router.get("/", getAllOrderItems);
router.get("/:id", getOrderItemById);
router.put("/:id", updateOrderItem);
router.delete("/:id", deleteOrderItem);

module.exports = router;
