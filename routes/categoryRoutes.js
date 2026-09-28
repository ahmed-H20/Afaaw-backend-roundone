const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const protect = require("../middlewares/protect");
const restrictTo = require("../middlewares/restrictTo");

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  getProductsByCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const {
  createCategorySchema,
  updateCategorySchema,
  categoryParams,
} = require("../validations/category.validation");

router.post(
  "/",
  protect,
  restrictTo("admin"),
  validate({ body: createCategorySchema }),
  createCategory,
);
router.get("/", getAllCategories);
router.get("/:id", validate({ params: categoryParams }), getCategoryById);
router.get(
  "/:id/products",
  validate({ params: categoryParams }),
  getProductsByCategory,
);
router.put(
  "/:id",
  protect,
  restrictTo("admin"),
  validate({ params: categoryParams, body: updateCategorySchema }),
  updateCategory,
);
router.delete(
  "/:id",
  protect,
  restrictTo("admin"),
  validate({ params: categoryParams }),
  deleteCategory,
);

module.exports = router;
