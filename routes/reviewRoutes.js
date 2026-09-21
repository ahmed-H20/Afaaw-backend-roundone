const express = require("express");
const router = express.Router();

const {
    createReview,
    getReviewsByProductId,
    getReviewsByUserId,
} = require("../controllers/reviewController");

router.post("/", createReview);
router.get("/product/:productId", getReviewsByProductId);
router.get("/user/:userId", getReviewsByUserId);

module.exports = router;
