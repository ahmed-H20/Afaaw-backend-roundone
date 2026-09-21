// Merge duplicate categories so the unique name index can be built.
//
// Categories count as duplicates when their names match ignoring case and
// surrounding spaces ("Shoes", "shoes", " Shoes "). For each group the oldest
// category is kept, every product pointing at a duplicate is moved to it, and
// the duplicates are deleted. Names are then trimmed and the index is built.
//
// Dry run (changes nothing, prints the plan):
//   node scripts/dedupeCategories.js
// Apply:
//   node scripts/dedupeCategories.js --apply

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Category = require("../models/categories");
const Product = require("../models/productsModel");

const normalize = (name) => (name || "").trim().toLowerCase();

const dedupeCategories = async ({ apply }) => {
  const log = (msg) => console.log((apply ? "" : "[dry run] ") + msg);

  // Oldest first, so the first entry in each group is the one we keep.
  const categories = await Category.find().sort({ createdAt: 1, _id: 1 });

  const groups = new Map();
  for (const category of categories) {
    const key = normalize(category.name);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(category);
  }

  let merged = 0;
  let productsMoved = 0;

  for (const [key, group] of groups) {
    if (group.length < 2) continue;

    const [keep, ...duplicates] = group;
    const duplicateIds = duplicates.map((c) => c._id);
    const affected = await Product.countDocuments({
      category: { $in: duplicateIds },
    });

    log(
      `"${key}": keeping ${keep._id} ("${keep.name}"), ` +
        `merging ${duplicates.length} duplicate(s), moving ${affected} product(s)`,
    );

    if (apply) {
      await Product.updateMany(
        { category: { $in: duplicateIds } },
        { category: keep._id },
      );
      await Category.deleteMany({ _id: { $in: duplicateIds } });
    }

    merged += duplicates.length;
    productsMoved += affected;
  }

  // Older documents may have untrimmed names; trim only applies on save.
  let trimmed = 0;
  for (const [, group] of groups) {
    const keep = group[0];
    if (keep.name !== keep.name.trim()) {
      log(`trimming "${keep.name}" -> "${keep.name.trim()}"`);
      if (apply) {
        await Category.updateOne(
          { _id: keep._id },
          { name: keep.name.trim() },
        );
      }
      trimmed++;
    }
  }

  if (apply) {
    // Drops the old index if it differs and builds the case-insensitive one.
    await Category.syncIndexes();
    log("unique index on name is in place");
  }

  log(
    `done: ${merged} duplicate(s) merged, ${productsMoved} product(s) moved, ` +
      `${trimmed} name(s) trimmed`,
  );
  if (!apply) {
    console.log("Nothing was changed. Re-run with --apply to make these changes.");
  }

  return { merged, productsMoved, trimmed };
};

module.exports = dedupeCategories;

if (require.main === module) {
  dotenv.config();
  const apply = process.argv.includes("--apply");

  if (!process.env.MONGODB_URL) {
    console.error("MONGODB_URL is not set. Add it to .env first.");
    process.exit(1);
  }

  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => dedupeCategories({ apply }))
    .then(() => mongoose.disconnect())
    .catch(async (error) => {
      console.error(error);
      await mongoose.disconnect();
      process.exit(1);
    });
}
