const { z } = require("zod");

//mongoo obj
const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid id");

const idParams = (...names) =>
  z.object(Object.fromEntries(names.map((n) => [n, objectId])));

const nonEmpty = (schema) =>
  schema.refine(
    (data) => Object.keys(data).length > 0,
    "Provide at least one field to update",
  );

const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

module.exports = { objectId, idParams, nonEmpty, listQuerySchema };
