const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const validate = require("../middleware/validate.middleware");
const {
  createProductSchema,
  updateProductSchema,
  productIdSchema,
} = require("../validations/product.validation");

const router = express.Router();

router.route("/").post(validate(createProductSchema), createProduct).get(getAllProducts);

router
  .route("/:id")
  .get(validate(productIdSchema), getProductById)
  .put(validate(updateProductSchema), updateProduct)
  .delete(validate(productIdSchema), deleteProduct);

module.exports = router;
