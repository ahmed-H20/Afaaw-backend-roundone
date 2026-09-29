const express = require("express");

const categoryRouter = express.Router();

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");

const validate = require("../middlewares/validation.middleware");
const { protect, allowedTo } = require("../middlewares/auth.middleware");

const {
  createCategorySchema,
  categoryIdSchema,
  updateCategorySchema,
} = require("../validations/category.validation");

// Public routes
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", validate(categoryIdSchema), getCategoryById);

// Admin restricted routes
categoryRouter.post(
  "/",
  protect,
  allowedTo("admin"),
  validate(createCategorySchema),
  createCategory
);

categoryRouter.put(
  "/:id",
  protect,
  allowedTo("admin"),
  validate(updateCategorySchema),
  updateCategory
);

categoryRouter.delete(
  "/:id",
  protect,
  allowedTo("admin"),
  validate(categoryIdSchema),
  deleteCategory
);

module.exports = categoryRouter;