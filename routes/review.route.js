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

router.get("/", reviewController.getAllReviews);
router.get(
	"/product/:productId",
	validateRequest({ params: reviewProductParamsSchema }),
	reviewController.getReviewsByProductId,
);
router.get(
	"/user/:userId",
	validateRequest({ params: reviewUserParamsSchema }),
	reviewController.getReviewsByUserId,
);
router.post("/", validateRequest({ body: createReviewBodySchema }), reviewController.createReview);

router.patch(
	"/:id",
	validateRequest({ params: reviewIdParamsSchema, body: updateReviewBodySchema }),
	reviewController.updateReview,
);
router.delete("/:id", validateRequest({ params: reviewIdParamsSchema }), reviewController.deleteReview);
router.get("/:id", validateRequest({ params: reviewIdParamsSchema }), reviewController.getReviewById);

export default router;