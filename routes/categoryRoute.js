const express = require("express");
const router = express.Router();
const {
  createCategoryValidation,
  categoryIdValidation,
} = require("../utils/validations/categoryValidation");

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} = require("../services/categoryService");

router.post("/", createCategoryValidation, createCategory);
router.get("/", getAllCategories);
router.get("/:id", categoryIdValidation, getCategoryById);
router.put("/:id", categoryIdValidation, updateCategory);

module.exports = router;
