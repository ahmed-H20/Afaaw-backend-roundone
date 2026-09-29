const express = require("express");
const { addCategory, getAllCategories, updateCategory, deleteCategory, getProductsByCategory } = require("../controller/categoryController");
const { addCategoryValidation } = require("../utils/validation/categoryValidation");
const router = express.Router();


router.post("/", addCategoryValidation, addCategory)
router.get("/", getAllCategories)
router.get("/:categoryId", getAllCategories)
router.patch("/:categoryId",addCategoryValidation,updateCategory)
router.delete("/:categoryId",deleteCategory)
router.get("/:categoryId/products",getProductsByCategory)



module.exports = router;