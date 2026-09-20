const express = require('express');
const router = express.Router();

const {
	getCartByUserId,
	addItemToCart,
	updateCartItem,
	removeCartItem,
} = require('../services/cartService');

router.get('/:userId', getCartByUserId);
router.post('/items', addItemToCart);
router.put('/items/:id', updateCartItem);
router.delete('/items/:id', removeCartItem);

module.exports = router;
