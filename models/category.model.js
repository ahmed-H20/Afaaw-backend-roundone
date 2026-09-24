const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      minlength: [2, "Category name must be at least 2 characters"],
      maxlength: [50, "Category name cannot exceed 50 characters"],
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Category = mongoose.model("Category", categoriesSchema);
module.exports = Category;