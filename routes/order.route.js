import express from "express";
import * as orderController from "../controllers/order.controller.js";
import { authenticate, authorizeRoles } from "../middleware/authenticate.js";
import { authorizeOrderAccess } from "../middleware/authorize-resource.js";
import { validateRequest } from "../middleware/validate-request.js";
import {
	createOrderBodySchema,
	orderIdParamsSchema,
	updateOrderBodySchema,
} from "../validations/order.validation.js";

const router = express.Router();

router.get("/", authenticate, orderController.getAllOrders);
router.get(
	"/:id",
	authenticate,
	validateRequest({ params: orderIdParamsSchema }),
	authorizeOrderAccess,
	orderController.getOrderById,
);
router.post("/", authenticate, validateRequest({ body: createOrderBodySchema }), orderController.createOrder);
router.patch(
	"/:id",
	authenticate,
	validateRequest({ params: orderIdParamsSchema, body: updateOrderBodySchema }),
	authorizeOrderAccess,
	orderController.updateOrder,
);
router.delete(
	"/:id",
	authenticate,
	validateRequest({ params: orderIdParamsSchema }),
	authorizeOrderAccess,
	orderController.deleteOrder,
);

export default router;