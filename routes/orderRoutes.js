const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const protect = require("../middlewares/protect");
const restrictTo = require("../middlewares/restrictTo");

const {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const {
  updateStatusSchema,
  orderIdParams,
} = require("../validations/order.validation");

// No anonymous access to any order.
router.use(protect);

// Admin
router.get("/", restrictTo("admin"), getAllOrders);
router.patch(
  "/:orderId/status",
  restrictTo("admin"),
  validate({ params: orderIdParams, body: updateStatusSchema }),
  updateOrderStatus,
);

// User - "/me" must be declared before "/:orderId" or it gets matched as an id.
router.post("/", createOrder);
router.get("/me", getMyOrders);
router.get("/:orderId", validate({ params: orderIdParams }), getOrderById);
router.patch(
  "/:orderId/cancel",
  validate({ params: orderIdParams }),
  cancelOrder,
);

module.exports = router;
