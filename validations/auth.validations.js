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

module.exports = { registerSchema, loginSchema };
