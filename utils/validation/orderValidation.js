const { body, param } = require('express-validator');
const validationMiddleware = require('../../middleware/validation.middleware');

const createOrderValidator = [
	body('user_id')
		.notEmpty()
		.isMongoId()
		.withMessage('Invalid User Mongo ID format'),
	body('items')
		.isArray({ min: 1 })
		.withMessage('Order items array cannot be empty'),
	body('items.*.product_id')
		.notEmpty()
		.isMongoId()
		.withMessage('Invalid Product Mongo ID'),
	body('items.*.quantity')
		.isInt({ min: 1 })
		.withMessage('Quantity must be at least 1'),
	body('items.*.prise')
		.isFloat({ min: 0 })
		.withMessage('Item price must be positive'),
	validationMiddleware,
];

const updateOrderStatusValidator = [
	param('id').isMongoId().withMessage('Invalid Order Mongo ID format'),
	body('status')
		.notEmpty()
		.isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
		.withMessage('Invalid order status value'),
	validationMiddleware,
];

const orderIdValidator = [
	param('id').isMongoId().withMessage('Invalid Order Mongo ID format'),
	validationMiddleware,
];

module.exports = {
	createOrderValidator,
	updateOrderStatusValidator,
	orderIdValidator,
};
