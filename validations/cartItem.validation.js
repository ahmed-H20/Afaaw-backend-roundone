const { z } = require("zod");

const createCartItemSchema = z.object({
  body: z.object({
    quantity: z.number().nonnegative().optional(),
    color: z.string().min(1).optional(),
    size: z.string().min(1).optional(),
    cartId: z.string().min(1).optional(),
    productId: z.string().min(1).optional(),
  }),
});

const cartItemIdSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

const cartIdSchema = z.object({
  params: z.object({
    cartId: z.string().min(1),
  }),
});

const updateCartItemSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    quantity: z.number().nonnegative().optional(),
    color: z.string().min(1).optional(),
    size: z.string().min(1).optional(),
    cartId: z.string().min(1).optional(),
    productId: z.string().min(1).optional(),
  }),
});

module.exports = {
  createCartItemSchema,
  cartItemIdSchema,
  cartIdSchema,
  updateCartItemSchema,
};