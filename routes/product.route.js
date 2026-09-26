import express from "express";
import * as productController from "../controllers/product.controller.js";
import { validateRequest } from "../middleware/validate-request.js";
import {
	createProductBodySchema,
	productIdParamsSchema,
	updateProductBodySchema,
} from "../validations/product.validation.js";

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/:id", validateRequest({ params: productIdParamsSchema }), productController.getProductById);
router.post("/", validateRequest({ body: createProductBodySchema }), productController.createProduct);
router.patch(
	"/:id",
	validateRequest({ params: productIdParamsSchema, body: updateProductBodySchema }),
	productController.updateProduct,
);
router.delete("/:id", validateRequest({ params: productIdParamsSchema }), productController.deleteProduct);

export default router;