const express = require('express');
const router = express.Router();

const {
	createReview,
	getReviewsByProductId,
	getReviewsByUserId,
	deleteReview,
} = require('../services/reviewService');

router.post('/', createReview);
router.get('/product/:productId', getReviewsByProductId);
router.get('/user/:userId', getReviewsByUserId);
router.delete('/:id', deleteReview);

module.exports = router;
