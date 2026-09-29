const { z } = require("zod");

const registerSchema = z.object({
  body: z.object({
    username: z
      .string({ required_error: "Username is required" })
      .min(3, "Username must be at least 3 characters"),
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email format"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters"),
    role: z.enum(["user", "admin", "instructor"]).optional(),
    fullName: z.string().optional(),
  }),
});

const loginSchema = z.object({
  body: z
    .object({
      email: z.string().optional(),
      username: z.string().optional(),
      identifier: z.string().optional(),
      password: z
        .string({ required_error: "Password is required" })
        .min(1, "Password is required"),
    })
    .refine(
      (data) => Boolean(data.email || data.username || data.identifier),
      {
        message: "Email or username is required for login",
        path: ["email"],
      },
    ),
});

module.exports = {
  registerSchema,
  loginSchema,
};
