const express = require('express');
const router = express.Router();

const {
	createReview,
	getReviewsByProductId,
	getReviewsByUserId,
	deleteReview,
} = require('../services/reviewService');
const {
	createReviewValidator,
	reviewIdValidator,
	productIdParamValidator,
	userIdParamValidator,
} = require('../utils/validation/reviewValidation');

router.post('/', createReviewValidator, createReview);
router.get(
	'/product/:productId',
	productIdParamValidator,
	getReviewsByProductId,
);
router.get('/user/:userId', userIdParamValidator, getReviewsByUserId);
router.delete('/:id', reviewIdValidator, deleteReview);

module.exports = router;
