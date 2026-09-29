import express from "express";
import * as orderController from "../controllers/order.controller.js";
import { validateRequest } from "../middleware/validate-request.js";
import {
	createOrderBodySchema,
	orderIdParamsSchema,
	updateOrderBodySchema,
} from "../validations/order.validation.js";

const router = express.Router();

router.get("/", orderController.getAllOrders);
router.get("/:id", validateRequest({ params: orderIdParamsSchema }), orderController.getOrderById);
router.post("/", validateRequest({ body: createOrderBodySchema }), orderController.createOrder);
router.patch(
	"/:id",
	validateRequest({ params: orderIdParamsSchema, body: updateOrderBodySchema }),
	orderController.updateOrder,
);
router.delete("/:id", validateRequest({ params: orderIdParamsSchema }), orderController.deleteOrder);

export default router;