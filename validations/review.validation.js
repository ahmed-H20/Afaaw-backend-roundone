const { z } = require("zod");
const { objectId, idParams } = require("./common");

// No userId: the author comes from the token, or anyone could post a review
// as somebody else.
const createReviewSchema = z.strictObject({
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
