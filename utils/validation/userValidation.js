const { body, param } = require('express-validator');
const validationMiddleware = require('../../middleware/validation.middleware');

const createUserValidator = [
	body('name').notEmpty().withMessage('User name is required').trim(),
	body('email')
		.notEmpty()
		.withMessage('Email is required')
		.isEmail()
		.withMessage('Please enter a valid email address')
		.normalizeEmail(),
	body('password')
		.notEmpty()
		.withMessage('Password is required')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long'),
	validationMiddleware,
];

const updateUserValidator = [
	param('id').isMongoId().withMessage('Invalid User Mongo ID format'),
	body('name').optional().trim(),
	body('email')
		.optional()
		.isEmail()
		.withMessage('Please enter a valid email address')
		.normalizeEmail(),
	body('password')
		.optional()
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long'),
	validationMiddleware,
];

const userIdValidator = [
	param('id').isMongoId().withMessage('Invalid User Mongo ID format'),
	validationMiddleware,
];

module.exports = {
	createUserValidator,
	updateUserValidator,
	userIdValidator,
};
