const express = require("express");
const router = express.Router();

const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");
const {
    createProductValidator,
    getProductValidator,
    updateProductValidator,
    deleteProductValidator,
} = require("../utils/validators/product.validator");

router.post("/", createProductValidator, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductValidator, getProductById);
router.put("/:id", updateProductValidator, updateProduct);
router.delete("/:id", deleteProductValidator, deleteProduct);

module.exports = router;
