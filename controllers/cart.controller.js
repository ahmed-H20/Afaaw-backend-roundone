import * as cartService from "../services/cart.service.js";

const getCart = async (req, res) => {
	const cart = await cartService.getCart(req.validated.params.userId);
	res.json(cart);
};

const addItemToCart = async (req, res) => {
	const { productId, quantity } = req.validated.body;
	const cart = await cartService.addItemToCart(req.validated.params.userId, productId, quantity);
	res.json(cart);
};

const updateCartItemQuantity = async (req, res) => {
	const cart = await cartService.updateCartItemQuantity(
		req.validated.params.userId,
		req.validated.params.itemId,
		req.validated.body.quantity,
	);
	res.json(cart);
};

const removeItemFromCart = async (req, res) => {
	const cart = await cartService.removeItemFromCart(
		req.validated.params.userId,
		req.validated.params.itemId,
	);
	res.json(cart);
};

const clearCart = async (req, res) => {
	const cart = await cartService.clearCart(req.validated.params.userId);
	res.json(cart);
};

export { getCart, addItemToCart, updateCartItemQuantity, removeItemFromCart, clearCart };
