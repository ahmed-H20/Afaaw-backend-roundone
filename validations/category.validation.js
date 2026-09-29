const { z } = require("zod");

const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1),
  }),
});

const categoryIdSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

const updateCategorySchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    name: z.string().min(1).optional(),
  }),
});

module.exports = {
  createCategorySchema,
  categoryIdSchema,
  updateCategorySchema,
};