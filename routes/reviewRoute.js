const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const {
    createReviewValidation,
    productIdValidation,
    userIdValidation,
} = require("../utils/validators/reviewValidator");

const {
    createReview,
    getReviewsByProductId,
    getReviewsByUserId,
} = require("../controllers/reviewController");

router.post("/", createReviewValidation, validate, createReview);
router.get("/product/:productId", productIdValidation, validate, getReviewsByProductId);
router.get("/user/:userId", userIdValidation, validate, getReviewsByUserId);
