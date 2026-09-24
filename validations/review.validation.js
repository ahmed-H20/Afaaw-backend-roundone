const { z } = require("zod");

const { objectId } = require("./common.validation");
const reviewFields = {
  userId: objectId,
  productId: objectId,
  rating: z.coerce
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),
  comment: z
    .string()
    .trim()
    .min(3, "Comment is too short")
    .max(200, "Comment too long")
    .optional(),
};

const createReviewSchema = z.object({
  body: z.object(reviewFields),
});

const updateReviewSchema = z.object({
  params: z.object({ id: objectId }),
  body: z
    .object(reviewFields)
    .partial()
    .refine(
      (body) => Object.keys(body).length > 0,
      "At least one field is required",
    ),
});

const reviewIdSchema = z.object({
  params: z.object({ id: objectId }),
});

const reviewProductIdSchema = z.object({
  params: z.object({ productId: objectId }),
});

module.exports = {
  createReviewSchema,
  updateReviewSchema,
  reviewIdSchema,
  reviewProductIdSchema,
};
