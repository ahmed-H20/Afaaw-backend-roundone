const { z } = require("zod");

const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    price: z.number().positive(),
    stock: z.number().int().nonnegative(),
    category: z.string().min(1).optional(),
  }),
});

const productIdSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

const updateProductSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    name: z.string().min(1).optional(),
    price: z.number().positive().optional(),
    stock: z.number().int().nonnegative().optional(),
    category: z.string().min(1).optional(),
  }),
});

module.exports = {
  createProductSchema,
  productIdSchema,
  updateProductSchema,
};