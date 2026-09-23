const { z } = require("zod");

//mongoo obj
const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid id");

module.exports = { objectId };
