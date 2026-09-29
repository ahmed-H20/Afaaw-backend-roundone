import { z } from "zod";
import { objectIdSchema } from "./common.validation.js";

const orderStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

const orderFields = {
	userId: objectIdSchema,
};

const orderItemSchema = z.strictObject({
	productId: objectIdSchema,
	quantity: z.number().int().positive().max(Number.MAX_SAFE_INTEGER),
	color: z.string().trim().min(1).max(50).optional(),
	size: z.string().trim().min(1).max(50).optional(),
});

export const orderIdParamsSchema = z.object({ id: objectIdSchema });

export const createOrderBodySchema = z.strictObject({
	...orderFields,
	items: z.array(orderItemSchema).min(1),
});

export const updateOrderBodySchema = z
	.strictObject({ status: z.enum(orderStatuses) })
	.refine((order) => Object.keys(order).length > 0, {
		message: "Order status is required",
	});