const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

// Unique regardless of case, so "Shoes" and "shoes" can't both exist.
// Existing duplicates must be merged first: scripts/dedupeCategories.js
categorySchema.index(
  { name: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } },
);

// Named "Category" to match the ref in productsModel.js.
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
