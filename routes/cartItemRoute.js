const express =require('express')
const router = express.Router()
const cartItemServices = require('../services/cartItemService')


router.route('/').get(cartItemServices.getAllCartItems)
                .post(cartItemServices.createCartItem)


router.route('/cart/:cartID').get(cartItemServices.getCartItemsByCartId)

router.route('/:id').get(cartItemServices.getCartItemById)
                    .put(cartItemServices.updateCartItem)
                    .delete(cartItemServices.deleteCartItem)


module.exports = router