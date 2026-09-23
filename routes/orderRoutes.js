const express = require('express');
const router = express.Router();

const {
	createOrder,
	getAllOrders,
	getOrderById,
	updateOrderStatus,
} = require('../services/orderService');
const {
	createOrderValidator,
	updateOrderStatusValidator,
	orderIdValidator,
} = require('../utils/validation/orderValidation');

router.post('/', createOrderValidator, createOrder);
router.get('/', getAllOrders);
router.get('/:id', orderIdValidator, getOrderById);
router.put('/:id/status', updateOrderStatusValidator, updateOrderStatus);

module.exports = router;
