import express from "express";
import * as cartController from "../controllers/cart.controller.js";
import { validateRequest } from "../middleware/validate-request.js";
import {
	addCartItemBodySchema,
	cartItemParamsSchema,
	cartUserParamsSchema,
	updateCartItemBodySchema,
} from "../validations/cart.validation.js";

const router = express.Router();

router.get(
	"/:userId",
	validateRequest({ params: cartUserParamsSchema }),
	cartController.getCart,
);
router.post(
	"/:userId/items",
	validateRequest({ params: cartUserParamsSchema, body: addCartItemBodySchema }),
	cartController.addItemToCart,
);
router.patch(
	"/:userId/items/:itemId",
	validateRequest({ params: cartItemParamsSchema, body: updateCartItemBodySchema }),
	cartController.updateCartItemQuantity,
);
router.delete(
	"/:userId/items/:itemId",
	validateRequest({ params: cartItemParamsSchema }),
	cartController.removeItemFromCart,
);
router.delete(
	"/:userId/items",
	validateRequest({ params: cartUserParamsSchema }),
	cartController.clearCart,
);

export default router;
