const { z } = require("zod");

const createProductItemSchema = z.object({
  body: z.object({
    quantity: z.number().nonnegative().optional(),
    color: z.string().min(1).optional(),
    size: z.string().min(1).optional(),
    productId: z.string().min(1).optional(),
  }),
});

const productItemIdSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

const productIdSchema = z.object({
  params: z.object({
    productId: z.string().min(1),
  }),
});

const updateProductItemSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    quantity: z.number().nonnegative().optional(),
    color: z.string().min(1).optional(),
    size: z.string().min(1).optional(),
    productId: z.string().min(1).optional(),
  }),
});

module.exports = {
  createProductItemSchema,
  productItemIdSchema,
  productIdSchema,
  updateProductItemSchema,
}; 