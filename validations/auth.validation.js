import { z } from "zod";

const emailSchema = z.string().trim().toLowerCase().email().max(100);
const passwordSchema = z
	.string()
	.min(8, "Password must contain at least 8 characters")
	.refine((password) => Buffer.byteLength(password, "utf8") <= 72, {
		message: "Password must not exceed 72 bytes",
	});
const phoneSchema = z
	.string()
	.trim()
	.regex(/^01[0125][0-9]{8}$/, "Please use a valid Egyptian phone number")
	.max(11, "Phone number cannot exceed 11 characters").optional();
const addressSchema = z.string().trim().max(200, "Address cannot exceed 200 characters").optional();

export const registerBodySchema = z
	.strictObject({
		name: z.string().trim().min(3).max(50),
		email: emailSchema,
		password: passwordSchema,
		confirmPassword: z.string(),
		phone: phoneSchema,
		address: addressSchema,
	})
	.refine(({ password, confirmPassword }) => password === confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords do not match",
	})
	.transform(({ confirmPassword, ...body }) => body);

export const loginBodySchema = z.strictObject({
	email: emailSchema,
	password: z.string().refine((password) => Buffer.byteLength(password, "utf8") <= 72, {
		message: "Password must not exceed 72 bytes",
	}),
});

export const verifyEmailBodySchema = z.strictObject({
	email: emailSchema,
	code: z.string().regex(/^\d{6}$/, "Verification code must be six digits"),
});

export const resendVerificationBodySchema = z.strictObject({ email: emailSchema });

export const requestPasswordResetBodySchema = z.strictObject({ email: emailSchema });

export const resetPasswordBodySchema = z.strictObject({
	email: emailSchema,
	code: z.string().regex(/^\d{6}$/, "Reset code must be six digits"),
	password: passwordSchema,
});

export const changePasswordBodySchema = z.strictObject({
	currentPassword: z.string().refine((password) => Buffer.byteLength(password, "utf8") <= 72, {
		message: "Password must not exceed 72 bytes",
	}),
	newPassword: passwordSchema,
});
