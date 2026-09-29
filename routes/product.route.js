const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const validate = require("../middleware/validate.middleware");
const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const {
  createProductSchema,
  updateProductSchema,
  productIdSchema,
} = require("../validations/product.validation");
const roles = require("../constants/roles");

const router = express.Router();

router
  .route("/")
  .post(
    protect,
    authorize(roles.ADMIN),
    validate(createProductSchema),
    createProduct,
  )
  .get(getAllProducts);

router
  .route("/:id")
  .get(validate(productIdSchema), getProductById)
  .put(
    protect,
    authorize(roles.ADMIN),
    validate(updateProductSchema),
    updateProduct,
  )
  .delete(
    protect,
    authorize(roles.ADMIN),
    validate(productIdSchema),
    deleteProduct,
  );

module.exports = router;
