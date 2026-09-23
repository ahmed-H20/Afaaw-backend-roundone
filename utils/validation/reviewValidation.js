const { body, param } = require('express-validator');
const validationMiddleware = require('../../middleware/validation.middleware');

const createReviewValidator = [
	body('user_id')
		.notEmpty()
		.isMongoId()
		.withMessage('Invalid User Mongo ID format'),
	body('product_id')
		.notEmpty()
		.isMongoId()
		.withMessage('Invalid Product Mongo ID format'),
	body('rating')
		.notEmpty()
		.isInt({ min: 1, max: 5 })
		.withMessage('Rating must be an integer between 1 and 5'),
	body('commit')
		.optional()
		.isString()
		.trim()
		.isLength({ min: 3 })
		.withMessage('Comment must be at least 3 characters long'),
	validationMiddleware,
];

const reviewIdValidator = [
	param('id').isMongoId().withMessage('Invalid Review Mongo ID format'),
	validationMiddleware,
];

const productIdParamValidator = [
	param('productId').isMongoId().withMessage('Invalid Product Mongo ID format'),
	validationMiddleware,
];

const userIdParamValidator = [
	param('userId').isMongoId().withMessage('Invalid User Mongo ID format'),
	validationMiddleware,
];

module.exports = {
	createReviewValidator,
	reviewIdValidator,
	productIdParamValidator,
	userIdParamValidator,
};
