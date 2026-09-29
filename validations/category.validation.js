import { z } from "zod";
import { objectIdSchema } from "./common.validation.js";

const categoryFields = {
	name: z.string().trim().min(1).max(120),
};

export const categoryIdParamsSchema = z.object({ id: objectIdSchema });

export const createCategoryBodySchema = z.strictObject(categoryFields);

export const updateCategoryBodySchema = z
	.strictObject(categoryFields)
	.partial()
	.refine((category) => Object.keys(category).length > 0, {
		message: "At least one category field is required",
	});