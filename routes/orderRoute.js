const express =require('express')
const router = express.Router()
const orderRoute = require('../services/orderService')


router.route('/').get(orderRoute.getAllOrders)
                .post(orderRoute.createOrder)


router.route('/user/:userId').get(orderRoute.getOrdersByUserId)

router.route('/:id').get(orderRoute.getOrderById)
                    .put(orderRoute.updateOrder)
                    .delete(orderRoute.deleteOrder)


module.exports = router