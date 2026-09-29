import express from "express";
import * as categoryController from "../controllers/category.controller.js";
import { validateRequest } from "../middleware/validate-request.js";
import {
	categoryIdParamsSchema,
	createCategoryBodySchema,
	updateCategoryBodySchema,
} from "../validations/category.validation.js";

const router = express.Router();

router.get("/", categoryController.getAllCategories);
router.get("/:id", validateRequest({ params: categoryIdParamsSchema }), categoryController.getCategoryById);
router.post("/", validateRequest({ body: createCategoryBodySchema }), categoryController.createCategory);
router.patch(
	"/:id",
	validateRequest({ params: categoryIdParamsSchema, body: updateCategoryBodySchema }),
	categoryController.updateCategory,
);
router.delete("/:id", validateRequest({ params: categoryIdParamsSchema }), categoryController.deleteCategory);

export default router;