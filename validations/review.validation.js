import { z } from "zod";
import { objectIdSchema } from "./common.validation.js";

const reviewFields = {
	userId: objectIdSchema,
	productId: objectIdSchema,
	rating: z.number().min(1).max(5),
	comment: z.string().trim().max(200).optional(),
};

export const reviewIdParamsSchema = z.object({ id: objectIdSchema });
export const reviewProductParamsSchema = z.object({ productId: objectIdSchema });
export const reviewUserParamsSchema = z.object({ userId: objectIdSchema });
export const createReviewBodySchema = z.strictObject(reviewFields);

export const updateReviewBodySchema = z
	.strictObject(reviewFields)
	.partial()
	.refine((review) => Object.keys(review).length > 0, {
		message: "At least one review field is required",
	});