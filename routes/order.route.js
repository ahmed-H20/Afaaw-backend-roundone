const express = require("express");

const {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");
const validate = require("../middleware/validate.middleware");
const {
  createOrderSchema,
  updateOrderSchema,
  orderIdSchema,
  orderUserIdSchema,
} = require("../validations/order.validation");

const router = express.Router();

router
  .route("/")
  .post(validate(createOrderSchema), createOrder)
  .get(getAllOrders);

router
  .route("/user/:userId")
  .get(validate(orderUserIdSchema), getOrdersByUserId);

router
  .route("/:id")
  .get(validate(orderIdSchema), getOrderById)
  .put(validate(updateOrderSchema), updateOrder)
  .delete(validate(orderIdSchema), deleteOrder);

module.exports = router;
