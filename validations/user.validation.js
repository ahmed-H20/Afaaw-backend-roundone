const { z } = require("zod");

const createUserSchema = z.object({
  body: z.object({
    username: z.string().min(3).optional(),
    fullName: z.string().min(1).optional(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["user", "admin", "instructor"]).optional(),
  }),
});

const userIdSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

const updateUserSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    username: z.string().min(3).optional(),
    fullName: z.string().min(1).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    role: z.enum(["user", "admin", "instructor"]).optional(),
  }),
});

module.exports = {
  createUserSchema,
  userIdSchema,
  updateUserSchema,
};