const express = require('express')
const router = express.Router()
const reviewService = require('../services/reviewService')



router.route('/').post(reviewService.createReview)

router.route('/product/:productId').get(reviewService.getReviewsByProductId)
router.route('/user/:userId').get(reviewService.getReviewsByUserId)

router.route('/:id').put(reviewService.updateReview)
                    .delete(reviewService.deleteReview)



module.exports = router
