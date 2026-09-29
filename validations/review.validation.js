const { z } = require("zod");

const createReviewSchema = z.object({
  body: z.object({
    userId: z.string().min(1),
    productId: z.string().min(1),
    rating: z.number().min(1).max(5),
    comment: z.string().max(200).optional(),
  }),
});

const productIdSchema = z.object({
  params: z.object({
    productId: z.string().min(1),
  }),
});

const userIdSchema = z.object({
  params: z.object({
    userId: z.string().min(1),
  }),
});

module.exports = {
  createReviewSchema,
  productIdSchema,
  userIdSchema,
};