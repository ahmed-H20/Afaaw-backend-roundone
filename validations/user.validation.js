const { z } = require("zod");

const { objectId } = require("./common.validation");
const userFields = {
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name cannot exceed 50 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
};

const createUserSchema = z.object({
  body: z.object(userFields),
});

const updateUserSchema = z.object({
  params: z.object({ id: objectId }),
  body: z
    .object(userFields)
    .partial()
    .refine(
      (body) => Object.keys(body).length > 0,
      "At least one field is required",
    ),
});

const userIdSchema = z.object({
  params: z.object({ id: objectId }),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  userIdSchema,
};
