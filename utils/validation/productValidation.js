const { body, param } = require('express-validator');
const validationMiddleware = require('../../middleware/validation.middleware');

const createProductValidator = [
	body('name').notEmpty().withMessage('Product name is required').trim(),
	body('description').optional().isString().trim(),
	body('price')
		.notEmpty()
		.withMessage('Product price is required')
		.isFloat({ min: 0 })
		.withMessage('Price must be a positive number'),
	body('stock')
		.notEmpty()
		.withMessage('Stock is required')
		.isInt({ min: 0 })
		.withMessage('Stock must be an integer >= 0'),
	body('category_id')
		.notEmpty()
		.withMessage('Category ID is required')
		.isMongoId()
		.withMessage('Invalid Category Mongo ID format'),
	validationMiddleware,
];

const updateProductValidator = [
	param('id').isMongoId().withMessage('Invalid Product Mongo ID format'),
	body('price')
		.optional()
		.isFloat({ min: 0 })
		.withMessage('Price must be a positive number'),
	body('stock')
		.optional()
		.isInt({ min: 0 })
		.withMessage('Stock must be an integer >= 0'),
	body('category_id')
		.optional()
		.isMongoId()
		.withMessage('Invalid Category Mongo ID format'),
	validationMiddleware,
];

const productIdValidator = [
	param('id').isMongoId().withMessage('Invalid Product Mongo ID format'),
	validationMiddleware,
];

module.exports = {
	createProductValidator,
	updateProductValidator,
	productIdValidator,
};
