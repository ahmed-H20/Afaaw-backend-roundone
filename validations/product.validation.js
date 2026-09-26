import { z } from "zod";
import { objectIdSchema } from "./common.validation.js";

const productFields = {
	name: z.string().trim().min(1).max(120),
	price: z.number().positive(),
	stock: z.number().int().min(0),
	category: objectIdSchema.optional(),
};

export const productIdParamsSchema = z.object({ id: objectIdSchema });

export const createProductBodySchema = z.strictObject(productFields);

export const updateProductBodySchema = z
	.strictObject(productFields)
	.partial()
	.refine((product) => Object.keys(product).length > 0, {
		message: "At least one product field is required",
	});