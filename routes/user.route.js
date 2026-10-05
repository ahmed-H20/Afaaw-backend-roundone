import express from "express";
import * as userController from "../controllers/user.controller.js";
import { authenticate, authorizeRoles } from "../middleware/authenticate.js";
import { validateRequest } from "../middleware/validate-request.js";
import {
	createUserBodySchema,
	listUsersQuerySchema,
	updateUserBodySchema,
	userIdParamsSchema,
} from "../validations/user.validation.js";

const router = express.Router();
const requireAdmin = [authenticate, authorizeRoles("admin")];

router.get("/", ...requireAdmin, validateRequest({ query: listUsersQuerySchema }), userController.listUsers);
router.post("/", ...requireAdmin, validateRequest({ body: createUserBodySchema }), userController.createUser);
router.get(
	"/:id",
	...requireAdmin,
	validateRequest({ params: userIdParamsSchema }),
	userController.getUserById,
);
router.patch(
	"/:id",
	...requireAdmin,
	validateRequest({ params: userIdParamsSchema, body: updateUserBodySchema }),
	userController.updateUser,
);
router.delete(
	"/:id",
	...requireAdmin,
	validateRequest({ params: userIdParamsSchema }),
	userController.deleteUser,
);

export default router;