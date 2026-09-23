const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");

const {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const {
  updateStatusSchema,
  orderUserParams,
  orderIdParams,
  orderUserAndIdParams,
} = require("../validations/order.validation");

// Admin
router.get("/", getAllOrders);
router.patch(
  "/:orderId/status",
  validate({ params: orderIdParams, body: updateStatusSchema }),
  updateOrderStatus,
);

// User
router.post("/:userId", validate({ params: orderUserParams }), createOrder);
router.get("/:userId", validate({ params: orderUserParams }), getUserOrders);
router.get(
  "/:userId/:orderId",
  validate({ params: orderUserAndIdParams }),
  getOrderById,
);
router.patch(
  "/:userId/:orderId/cancel",
  validate({ params: orderUserAndIdParams }),
  cancelOrder,
);

module.exports = router;
