const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const { protect, restrictTo } = require("../middleware/auth");
const {
    createProductValidation,
    updateProductValidation,
    productIdValidation,
} = require("../utils/validators/productValidator");
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");

router.post("/", protect, restrictTo("admin"), createProductValidation, validate, createProduct);
router.get("/", getAllProducts);
router.get("/:id", productIdValidation, validate, getProductById);
router.put("/:id", protect, restrictTo("admin"), productIdValidation, updateProductValidation, validate, updateProduct);
router.delete("/:id", protect, restrictTo("admin"), productIdValidation, validate, deleteProduct);

module.exports = router;