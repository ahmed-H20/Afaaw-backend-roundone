const Cart = require('../models/cartModel');
const CartItem = require('../models/cartItemsModel');

// @desc Get user cart with item details
// @route GET /api/cart/:userId
// @access Private
const getCartByUserId = async (req, res, next) => {
	try {
		let cart = await Cart.findOne({ user_id: req.params.userId });
		if (!cart) {
			cart = await Cart.create({ user_id: req.params.userId });
		}
		const cartItems = await CartItem.find({ cart_id: cart._id });
		res.status(200).json({ cart, cartItems });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error fetching cart' });
	}
};

// @desc Add item to cart
// @route POST /api/cart/items
// @access Private
const addItemToCart = async (req, res, next) => {
	try {
		const { cart_id, product_id, quantity } = req.body;

		if (!cart_id || !product_id || quantity === undefined) {
			return res
				.status(400)
				.json({ message: 'cart_id, product_id, and quantity are required' });
		}
		const cartItem = await CartItem.create(req.body);
		res.status(201).json({ message: 'Item added to cart', cartItem });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error adding item to cart' });
	}
};

// @desc Update cart item quantity/options
// @route PUT /api/cart/items/:id
// @access Private
const updateCartItem = async (req, res, next) => {
	try {
		const cartItem = await CartItem.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!cartItem) {
			return res.status(404).json({ message: 'Cart item not found' });
		}
		res.status(200).json({ message: 'Cart item updated', cartItem });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error updating cart item' });
	}
};

// @desc Remove item from cart
// @route DELETE /api/cart/items/:id
// @access Private
const removeCartItem = async (req, res, next) => {
	try {
		const cartItem = await CartItem.findByIdAndDelete(req.params.id);
		if (!cartItem) {
			return res.status(404).json({ message: 'Cart item not found' });
		}
		res.status(200).json({ message: 'Cart item removed' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error removing cart item' });
	}
};

module.exports = {
	getCartByUserId,
	addItemToCart,
	updateCartItem,
	removeCartItem,
};
