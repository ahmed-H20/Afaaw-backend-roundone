const { z } = require("zod");

const { objectId } = require("./common.validation");

const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, "Category name must be at least 2 characters")
      .max(50, "Category name cannot exceed 50 characters"),
  }),
});

const updateCategorySchema = z.object({
  params: z.object({ id: objectId }),
  body: z
    .object({
      name: z
        .string()
        .trim()
        .min(2, "Category name must be at least 2 characters")
        .max(50, "Category name cannot exceed 50 characters"),
    })
    .refine(
      (body) => Object.keys(body).length > 0,
      "At least one field is required",
    ),
});

const categoryIdSchema = z.object({
  params: z.object({ id: objectId }),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  categoryIdSchema,
};
