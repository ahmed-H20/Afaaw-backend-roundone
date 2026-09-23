const { body, param } = require('express-validator');
const validationMiddleware = require('../../middleware/validation.middleware');

const createCategoryValidator = [
	body('name')
		.notEmpty()
		.withMessage('Category name is required')
		.isString()
		.withMessage('Category name must be a string')
		.trim()
		.isLength({ min: 2, max: 50 })
		.withMessage('Category name must be between 2 and 50 characters'),
	validationMiddleware,
];

const updateCategoryValidator = [
	param('id').isMongoId().withMessage('Invalid Category Mongo ID format'),
	body('name')
		.optional()
		.isString()
		.trim()
		.isLength({ min: 2, max: 50 })
		.withMessage('Category name must be between 2 and 50 characters'),
	validationMiddleware,
];

const categoryIdValidator = [
	param('id').isMongoId().withMessage('Invalid Category Mongo ID format'),
	validationMiddleware,
];

module.exports = {
	createCategoryValidator,
	updateCategoryValidator,
	categoryIdValidator,
};
