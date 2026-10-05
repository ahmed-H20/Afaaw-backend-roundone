import express from "express";
import * as cartController from "../controllers/cart.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeSelfOrAdmin } from "../middleware/authorize-resource.js";
import { validateRequest } from "../middleware/validate-request.js";
import {
	addCartItemBodySchema,
	cartItemParamsSchema,
	cartUserParamsSchema,
	updateCartItemBodySchema,
} from "../validations/cart.validation.js";

const router = express.Router();
const requireCartOwner = [authenticate, authorizeSelfOrAdmin()];

router.get("/:userId", ...requireCartOwner, validateRequest({ params: cartUserParamsSchema }), cartController.getCart);
router.post(
	"/:userId/items",
	...requireCartOwner,
	validateRequest({ params: cartUserParamsSchema, body: addCartItemBodySchema }),
	cartController.addItemToCart,
);
router.patch(
	"/:userId/items/:itemId",
	...requireCartOwner,
	validateRequest({ params: cartItemParamsSchema, body: updateCartItemBodySchema }),
	cartController.updateCartItemQuantity,
);
router.delete(
	"/:userId/items/:itemId",
	...requireCartOwner,
	validateRequest({ params: cartItemParamsSchema }),
	cartController.removeItemFromCart,
);
router.delete(
	"/:userId/items",
	...requireCartOwner,
	validateRequest({ params: cartUserParamsSchema }),
	cartController.clearCart,
);

export default router;
