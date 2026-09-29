const { z } = require("zod");

const userRegistrationFields = {
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name cannot exceed 50 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address cannot exceed 100 characters"),
  profileImage: z.string().trim().optional(),
};

const registerSchema = z.object({
  body: z.object(userRegistrationFields),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "Password is required"),
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
