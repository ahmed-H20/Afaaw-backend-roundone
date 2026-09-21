const express = require("express")
const router = express.Router()
const cartServices = require('../services/cartService')



router.route('/').get(cartServices.getAllCart)
router.route('/add').post(cartServices.addProductToCart)
router.route('/remove').delete(cartServices.deleteProductFromCArt)

router.route('/user/:userId').get(cartServices.getCartByUserId)

router.route('/:id').get(cartServices.getCartById)

module.exports = router