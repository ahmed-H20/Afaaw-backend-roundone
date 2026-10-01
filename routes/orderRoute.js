const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const { protect, restrictTo } = require("../middleware/auth");
const {
    createOrderValidation,
    orderIdValidation,
    updateOrderStatusValidation,
} = require("../utils/validators/orderValidator");

const {
    createOrder,
    getOrderById,
    updateOrderStatus,
} = require("../controllers/orderController");

router.post("/", protect, createOrderValidation, validate, createOrder);
router.get("/:id", protect, orderIdValidation, validate, getOrderById);
router.put("/:id/status", protect, restrictTo("admin"), orderIdValidation, updateOrderStatusValidation, validate, updateOrderStatus);
