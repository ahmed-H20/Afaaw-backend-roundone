const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
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

router.post("/", createOrderValidation, validate, createOrder);
router.get("/:id", orderIdValidation, validate, getOrderById);
router.put("/:id/status", orderIdValidation, updateOrderStatusValidation, validate, updateOrderStatus);
