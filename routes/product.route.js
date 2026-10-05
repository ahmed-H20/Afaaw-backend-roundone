import express from "express";
import * as productController from "../controllers/product.controller.js";
import { authenticate, authorizeRoles } from "../middleware/authenticate.js";
import { validateRequest } from "../middleware/validate-request.js";
import {
	createProductBodySchema,
	productIdParamsSchema,
	updateProductBodySchema,
} from "../validations/product.validation.js";

const router = express.Router();
const requireAdmin = [authenticate, authorizeRoles("admin")];

router.get("/", productController.getAllProducts);
router.get("/:id", validateRequest({ params: productIdParamsSchema }), productController.getProductById);
router.post("/", ...requireAdmin, validateRequest({ body: createProductBodySchema }), productController.createProduct);
router.patch(
	"/:id",
	...requireAdmin,
	validateRequest({ params: productIdParamsSchema, body: updateProductBodySchema }),
	productController.updateProduct,
);
router.delete(
	"/:id",
	...requireAdmin,
	validateRequest({ params: productIdParamsSchema }),
	productController.deleteProduct,
);

export default router;