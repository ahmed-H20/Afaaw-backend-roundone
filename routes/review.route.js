// Review Routes   
import express from "express";
import * as reviewController from "../controllers/review.controller.js";
import { validateRequest } from "../middleware/validate-request.js";
import {
	createReviewBodySchema,
	reviewIdParamsSchema,
	reviewProductParamsSchema,
	reviewUserParamsSchema,
	updateReviewBodySchema,
} from "../validations/review.validation.js";

const router = express.Router();

// Get all reviews
router.get("/", reviewController.getAllReviews);

// Get reviews by product ID
router.get(
	"/product/:productId",
	validateRequest({ params: reviewProductParamsSchema }),
	reviewController.getReviewsByProductId,
);

// Get reviews by user ID
router.get(
	"/user/:userId",
	validateRequest({ params: reviewUserParamsSchema }),
	reviewController.getReviewsByUserId,
);

// Create a new review
router.post("/", validateRequest({ body: createReviewBodySchema }), reviewController.createReview);

// Update a review
router.patch(
	"/:id",
	validateRequest({ params: reviewIdParamsSchema, body: updateReviewBodySchema }),
	reviewController.updateReview,
);

// Delete a review
router.delete("/:id", validateRequest({ params: reviewIdParamsSchema }), reviewController.deleteReview);

// Get a single review
router.get("/:id", validateRequest({ params: reviewIdParamsSchema }), reviewController.getReviewById);

export default router;