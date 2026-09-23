const express = require('express');
const router = express.Router();

const {
	getCartByUserId,
	addItemToCart,
	updateCartItem,
	removeCartItem,
} = require('../services/cartService');
const {
	addCartItemValidator,
	updateCartItemValidator,
	cartItemIdValidator,
	getCartByUserIdValidator,
} = require('../utils/validation/cartValidation');

router.get('/:userId', getCartByUserIdValidator, getCartByUserId);
router.post('/items', addCartItemValidator, addItemToCart);
router.put('/items/:id', updateCartItemValidator, updateCartItem);
router.delete('/items/:id', cartItemIdValidator, removeCartItem);

module.exports = router;
