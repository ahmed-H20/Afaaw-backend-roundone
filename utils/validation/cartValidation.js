const { body, param } = require('express-validator');
const validationMiddleware = require('../../middleware/validation.middleware');

const addCartItemValidator = [
	body('cart_id')
		.notEmpty()
		.isMongoId()
		.withMessage('Invalid Cart Mongo ID format'),
	body('product_id')
		.notEmpty()
		.isMongoId()
		.withMessage('Invalid Product Mongo ID format'),
	body('quantity')
		.notEmpty()
		.isInt({ min: 1 })
		.withMessage('Quantity must be an integer greater than 0'),
	body('color').optional().isString().trim(),
	body('size').optional().isString().trim(),
	validationMiddleware,
];

const updateCartItemValidator = [
	param('id').isMongoId().withMessage('Invalid Cart Item Mongo ID format'),
	body('quantity')
		.notEmpty()
		.isInt({ min: 1 })
		.withMessage('Quantity must be an integer greater than 0'),
	validationMiddleware,
];

const cartItemIdValidator = [
	param('id').isMongoId().withMessage('Invalid Cart Item Mongo ID format'),
	validationMiddleware,
];

const getCartByUserIdValidator = [
	param('userId').isMongoId().withMessage('Invalid User Mongo ID format'),
	validationMiddleware,
];

module.exports = {
	addCartItemValidator,
	updateCartItemValidator,
	cartItemIdValidator,
	getCartByUserIdValidator,
};
