const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
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

router.post("/", createProductValidation, validate, createProduct);
router.get("/", getAllProducts);
router.get("/:id", productIdValidation, validate, getProductById);
router.put("/:id", productIdValidation, updateProductValidation, validate, updateProduct);
router.delete("/:id", productIdValidation, validate, deleteProduct);

module.exports = router;