const express = require("express");

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const validate = require("../middleware/validate.middleware");
const {
  createCategorySchema,
  updateCategorySchema,
  categoryIdSchema,
} = require("../validations/category.validation");

const router = express.Router();

router
  .route("/")
  .post(validate(createCategorySchema), createCategory)
  .get(getAllCategories);

router
  .route("/:id")
  .get(validate(categoryIdSchema), getCategoryById)
  .put(validate(updateCategorySchema), updateCategory)
  .delete(validate(categoryIdSchema), deleteCategory);

module.exports = router;
