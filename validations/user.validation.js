import { z } from "zod";
import { objectIdSchema } from "./common.validation.js";

const emailSchema = z.string().trim().toLowerCase().email().max(100);
const passwordSchema = z
	.string()
	.min(8, "Password must contain at least 8 characters")
	.refine((password) => Buffer.byteLength(password, "utf8") <= 72, {
		message: "Password must not exceed 72 bytes",
	});

export const userIdParamsSchema = z.object({ id: objectIdSchema });

export const listUsersQuerySchema = z.strictObject({
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(100).default(20),
	role: z.enum(["user", "admin"]).optional(),
	active: z.enum(["true", "false"]).transform((active) => active === "true").optional(),
});

export const createUserBodySchema = z.strictObject({
	name: z.string().trim().min(3).max(50),
	email: emailSchema,
	password: passwordSchema,
	phone: z.string().trim().regex(/^01[0125][0-9]{8}$/).optional(),
	address: z.string().trim().max(200).optional(),
});

export const updateUserBodySchema = z
	.strictObject({
		role: z.enum(["user", "admin"]).optional(),
		active: z.boolean().optional(),
	})
	.refine((user) => Object.keys(user).length > 0, {
		message: "At least one user field is required",
	});