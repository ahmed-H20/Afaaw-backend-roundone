const { z } = require("zod");
const { idParams, nonEmpty } = require("./common");

const createUserSchema = z.strictObject({
  fullName: z.string().trim().min(2, "Name is too short").max(100),
  email: z.email("Enter a valid email").trim().toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128),
});

const updateUserSchema = nonEmpty(
  createUserSchema.omit({ password: true }).partial(),
);

const userParams = idParams("id");

module.exports = { createUserSchema, updateUserSchema, userParams };
