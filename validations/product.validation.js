const { z } = require("zod");

const { objectId } = require("./common.validation");

const productFields = {
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  price: z.coerce.number().nonnegative("Price must be positive"),
  stock: z.coerce
    .number()
    .int("Stock must be integer")
    .nonnegative("Stock cannot be negative"),
  category: objectId,
};

const createProductSchema = z.object({
  body: z.object(productFields),
});

const updateProductSchema = z.object({
  params: z.object({ id: objectId }),
  body: z
    .object(productFields)
    .partial()
    .refine(
      (body) => Object.keys(body).length > 0,
      "At least one field is required",
    ),
});

const productIdSchema = z.object({
  params: z.object({ id: objectId }),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  productIdSchema,
};
