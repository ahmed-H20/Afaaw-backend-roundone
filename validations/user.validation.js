const { z } = require("zod");

const createUserSchema = z.object({
  body: z.object({
    fullName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
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
    fullName: z.string().min(1).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
  }),
});

module.exports = {
  createUserSchema,
  userIdSchema,
  updateUserSchema,
};