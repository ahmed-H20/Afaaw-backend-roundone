import { Cart } from "../models/cart.model.js";
import { CartItem } from "../models/cart-items.model.js";
import Product from "../models/product.model.js";
import AppError from "../errors/app-error.js";
import { objectIdSchema, quantitySchema } from "../validations/common.validation.js";

const getOrCreateCart = (userId) =>
	Cart.findOneAndUpdate(
		{ userId },
		{ $setOnInsert: { userId } },
		{ new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
	).lean();

const getCartContents = async (cart) => {
	const items = await CartItem.find({ cartId: cart._id })
		.populate({ path: "productId", select: "name price stock" })
		.lean();

	const totalItems = items.reduce((total, item) => total + item.quantity, 0);
	const totalPrice = items.reduce(
		(total, item) => total + (item.productId?.price ?? 0) * item.quantity,
		0,
	);

	return { cart, items, totalItems, totalPrice };
};

export const getCart = async (userId) => {
	objectIdSchema.parse(userId);
	const cart = await getOrCreateCart(userId);
	return getCartContents(cart);
};

export const addItemToCart = async (userId, productId, quantity = 1) => {
	objectIdSchema.parse(userId);
	objectIdSchema.parse(productId);
	quantitySchema.parse(quantity);

	const productExists = await Product.exists({ _id: productId });
	if (!productExists) {
		throw new AppError("Product not found", 404);
	}

	const cart = await getOrCreateCart(userId);
	await CartItem.findOneAndUpdate(
		{ cartId: cart._id, productId },
		{ $inc: { quantity } },
		{ new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
	);

	return getCartContents(cart);
};

export const updateCartItemQuantity = async (userId, itemId, quantity) => {
	objectIdSchema.parse(userId);
	objectIdSchema.parse(itemId);
	quantitySchema.parse(quantity);

	const cart = await Cart.findOne({ userId }).select("_id").lean();
	if (!cart) {
		throw new AppError("Cart item not found", 404);
	}

	const result = await CartItem.updateOne(
		{ _id: itemId, cartId: cart._id },
		{ $set: { quantity } },
		{ runValidators: true },
	);

	if (result.matchedCount === 0) {
		throw new AppError("Cart item not found", 404);
	}

	return getCartContents(cart);
};

export const removeItemFromCart = async (userId, itemId) => {
	objectIdSchema.parse(userId);
	objectIdSchema.parse(itemId);

	const cart = await Cart.findOne({ userId }).select("_id").lean();
	if (!cart) {
		throw new AppError("Cart item not found", 404);
	}

	const result = await CartItem.deleteOne({ _id: itemId, cartId: cart._id });
	if (result.deletedCount === 0) {
		throw new AppError("Cart item not found", 404);
	}

	return getCartContents(cart);
};

export const clearCart = async (userId) => {
	objectIdSchema.parse(userId);
	const cart = await getOrCreateCart(userId);
	await CartItem.deleteMany({ cartId: cart._id });
	return getCartContents(cart);
};


