const { z } = require("zod");

const { objectId } = require("./common.validation");

const createCartSchema = z.object({
  body: z.object({ userId: objectId }),
});

const cartIdSchema = z.object({
  params: z.object({ id: objectId }),
});

const cartUserIdSchema = z.object({
  params: z.object({ userId: objectId }),
});

const updateCartSchema = z.object({
  params: z.object({ id: objectId }),
  body: z
    .object({ userId: objectId })
    .partial()
    .refine(
      (body) => Object.keys(body).length > 0,
      "At least one field is required",
    ),
});

module.exports = {
  createCartSchema,
  cartIdSchema,
  cartUserIdSchema,
  updateCartSchema,
};
