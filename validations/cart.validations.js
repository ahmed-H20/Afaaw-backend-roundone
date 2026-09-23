const { z } = require("zod");
const { objectId, idParams } = require("./common");

const addItemSchema = z.strictObject({
  productId: objectId,
  quantity: z
    .number()
    .int("Quantity must be a whole number")
    .min(1, "Quantity must be at least 1")
    .default(1),
  color: z.string().trim().optional(),
  size: z.string().trim().optional(),
});

const updateQuantitySchema = z.strictObject({
  quantity: z
    .number()
    .int("Quantity must be a whole number")
    .min(1, "Quantity must be at least 1"),
});

const cartParams = idParams("userId");
const cartItemParams = idParams("userId", "itemId");

module.exports = {
  addItemSchema,
  updateQuantitySchema,
  cartParams,
  cartItemParams,
};
