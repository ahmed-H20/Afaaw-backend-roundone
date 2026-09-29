import { z } from "zod";
import { objectIdSchema, quantitySchema } from "./common.validation.js";

export const cartUserParamsSchema = z.object({ userId: objectIdSchema });

export const cartItemParamsSchema = z.object({
	userId: objectIdSchema,
	itemId: objectIdSchema,
});

export const addCartItemBodySchema = z.strictObject({
	productId: objectIdSchema,
	quantity: quantitySchema.optional(),
});

export const updateCartItemBodySchema = z.strictObject({
	quantity: quantitySchema,
});
