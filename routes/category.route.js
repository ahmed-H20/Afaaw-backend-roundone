const express = require("express");

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const validate = require("../middleware/validate.middleware");
const protect = require("../middleware/auth.middleware");
const {
  createCategorySchema,
  updateCategorySchema,
  categoryIdSchema,
} = require("../validations/category.validation");
const authorize = require("../middleware/role.middleware");
const roles = require("../constants/roles");

const router = express.Router();

router
  .route("/")
  .post(
    protect,
    authorize(roles.ADMIN),
    validate(createCategorySchema),
    createCategory,
  )
  .get(getAllCategories);

router
  .route("/:id")
  .get(validate(categoryIdSchema), getCategoryById)
  .put(
    protect,
    authorize(roles.ADMIN),
    validate(updateCategorySchema),
    updateCategory,
  )
  .delete(
    protect,
    authorize(roles.ADMIN),
    validate(categoryIdSchema),
    deleteCategory,
  );

module.exports = router;
