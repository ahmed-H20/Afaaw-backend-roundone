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

const {
  createCategorySchema,
  categoryIdSchema,
  updateCategorySchema,
} = require("../validations/category.validation");

categoryRouter.post(
  "/",
  validate(createCategorySchema),
  createCategory
);

categoryRouter.get("/", getAllCategories);

categoryRouter.get(
  "/:id",
  validate(categoryIdSchema),
  getCategoryById
);

categoryRouter.put(
  "/:id",
  validate(updateCategorySchema),
  updateCategory
);

categoryRouter.delete(
  "/:id",
  validate(categoryIdSchema),
  deleteCategory
);

module.exports = categoryRouter;