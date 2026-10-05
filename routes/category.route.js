import express from "express";
import * as categoryController from "../controllers/category.controller.js";
import { authenticate, authorizeRoles } from "../middleware/authenticate.js";
import { validateRequest } from "../middleware/validate-request.js";
import {
	categoryIdParamsSchema,
	createCategoryBodySchema,
	updateCategoryBodySchema,
} from "../validations/category.validation.js";

const router = express.Router();
const requireAdmin = [authenticate, authorizeRoles("admin")];

router.get("/", categoryController.getAllCategories);
router.get("/:id", validateRequest({ params: categoryIdParamsSchema }), categoryController.getCategoryById);
router.post("/", ...requireAdmin, validateRequest({ body: createCategoryBodySchema }), categoryController.createCategory);
router.patch(
	"/:id",
	...requireAdmin,
	validateRequest({ params: categoryIdParamsSchema, body: updateCategoryBodySchema }),
	categoryController.updateCategory,
);
router.delete(
	"/:id",
	...requireAdmin,
	validateRequest({ params: categoryIdParamsSchema }),
	categoryController.deleteCategory,
);

export default router;