const express = require("express");
const router = express.Router();
const {
  createOrderItemValidation,
  orderItemIdValidation,
  updateOrderItemValidation,
} = require("../utils/validations/orderItemValidation");

const {
  createOrderItem,
  getAllOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
} = require("../services/orderItemService");

router.post("/", createOrderItemValidation, createOrderItem);
router.get("/", getAllOrderItems);
router.get("/:id", orderItemIdValidation, getOrderItemById);
router.put(
  "/:id",
  orderItemIdValidation,
  updateOrderItemValidation,
  updateOrderItem,
);
router.delete("/:id", orderItemIdValidation, deleteOrderItem);

module.exports = router;
