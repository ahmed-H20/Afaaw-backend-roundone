const { z } = require("zod");

const registerSchema = z.strictObject({
  fullName: z.string().trim().min(2, "Name is too short").max(100),
  email: z.email("Enter a valid email").trim().toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128),
});

const loginSchema = z.strictObject({
  email: z.email("Enter a valid email").trim().toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

const forgotPasswordSchema = z.strictObject({
  email: z.email("Enter a valid email").trim().toLowerCase(),
});

const verifyOtpSchema = z.strictObject({
  email: z.email("Enter a valid email").trim().toLowerCase(),
  otp: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter the 6-digit code"),
});

const resetPasswordSchema = z.strictObject({
  resetToken: z.string().regex(/^[a-f0-9]{64}$/, "Invalid reset token"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128),
});

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  verifyOtpSchema,
  resetPasswordSchema,
};
