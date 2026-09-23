const { z } = require("zod");
const { objectId, idParams } = require("./common");

const createReviewSchema = z.strictObject({
  userId: objectId,
  productId: objectId,
  rating: z
    .number()
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
  comment: z.string().trim().max(200).optional(),
});

const reviewUserParams = idParams("userId");
const reviewProductParams = idParams("productId");

module.exports = {
  createReviewSchema,
  reviewUserParams,
  reviewProductParams,
};
