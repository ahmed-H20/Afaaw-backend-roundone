const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const {
    createCategoryValidation,
    updateCategoryValidation,
    categoryIdValidation,
} = require("../utils/validators/categoryValidator");

const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryController");

router.post("/", createCategoryValidation, validate, createCategory);
router.get("/", getAllCategories);
router.get("/:id", categoryIdValidation, validate, getCategoryById);
router.put("/:id", categoryIdValidation, updateCategoryValidation, validate, updateCategory);
router.delete("/:id", categoryIdValidation, validate, deleteCategory);
