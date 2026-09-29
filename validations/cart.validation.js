const { z } = require("zod");

const createCartSchema = z.object({
  body: z.object({
    userId: z.string().min(1),
  }),
});

const cartIdSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

const userIdSchema = z.object({
  params: z.object({
    userId: z.string().min(1),
  }),
});

const updateCartSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    userId: z.string().min(1).optional(),
  }),
});

module.exports = {
  createCartSchema,
  cartIdSchema,
  userIdSchema,
  updateCartSchema,
};