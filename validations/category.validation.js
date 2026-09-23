const { z } = require("zod");
const { idParams, nonEmpty } = require("./common");

const createCategorySchema = z.strictObject({
  name: z.string().trim().min(1, "Name is required").max(100),
});

const updateCategorySchema = nonEmpty(createCategorySchema.partial());

const categoryParams = idParams("id");

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  categoryParams,
};
