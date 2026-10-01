const express = require("express");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const router = express.Router();

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  getAllProductsByCategory,
} = require("../controllers/categoryController");
const {
  createCategoryValidator,
  getCategoryValidator,
  getCategoryProductsValidator,
} = require("../utils/validators/category.validator");

router
  .route("/")
  .get(getAllCategories)
  .post(
    authenticate,
    authorize("admin"),
    createCategoryValidator,
    createCategory,
  );
router.get(
  "/:id/products",
  getCategoryProductsValidator,
  getAllProductsByCategory,
);
router.get("/:id", getCategoryValidator, getCategoryById);

module.exports = router;
