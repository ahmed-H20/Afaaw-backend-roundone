const express = require("express");
const router = express.Router();

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  getAllProductsByCategory,
} = require("../services/categoryService");

router.route("/").get(getAllCategories).post(createCategory);
router.get("/:id/products", getAllProductsByCategory);
router.get("/:id", getCategoryById);

module.exports = router;

