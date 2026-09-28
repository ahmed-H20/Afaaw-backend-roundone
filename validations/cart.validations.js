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

// The cart owner comes from the token, never the URL - so only the item id
// is still a path param.
const itemParams = idParams("itemId");

module.exports = {
  addItemSchema,
  updateQuantitySchema,
  itemParams,
};
