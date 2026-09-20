const express = require("express");
const {
  getAllOrders,
  getOneOrderByLoggedUser,
  getAllOrdersByLoggedUser,
  createOrder,
  updateOrderStatus,
  softDeleteOrder,
} = require("../services/orderService");

const router = express.Router();

router.get("/", getAllOrders);
router.get("/:id", getAllOrdersByLoggedUser);
router.post("/", createOrder);
router.get("/:orderId", getOneOrderByLoggedUser);
router.patch("/:id/status", updateOrderStatus);
router.delete("/:id", softDeleteOrder);

module.exports = router;
