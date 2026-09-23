const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {
  createProductSchema,
  updateProductSchema,
  productParams,
} = require("../validations/product.validation");

router.post("/", validate({ body: createProductSchema }), createProduct);
router.get("/", getAllProducts);
router.get("/:id", validate({ params: productParams }), getProductById);
router.put(
  "/:id",
  validate({ params: productParams, body: updateProductSchema }),
  updateProduct,
);
router.delete("/:id", validate({ params: productParams }), deleteProduct);

module.exports = router;
