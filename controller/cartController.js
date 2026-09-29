const asyncHandler = require("express-async-handler");
const cartService = require("../services/cartService")
const cartItemService = require("../services/cartItemService")



const getAllCarts = asyncHandler(async (req, res, next) => {
    const { page, limit } = req.query
    const { cartData, totalCart, totalPages, currentPage, limitation } = await cartService.getAllCarts(page, limit)
    res.status(200).json({ success: true, data: cartData, totalCart, totalPages, page: currentPage, limit: limitation })
})
const getCart = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const { cartItems } = await cartService.getCart(userId)
    res.status(200).json({ success: true, data: cartItems })
})

const addCartItem = asyncHandler(async (req, res, next) => {
    const { userId, productId, quantity, color, size } = req.body;
    const { message } = await cartItemService.addCartItem(userId, productId, quantity, color, size)
    res.status(200).json({ success: true, message })
})
const deleteCartItem = asyncHandler(async (req, res, next) => {
    const { cartItemId } = req.params;
    const { message } = await cartItemService.deleteCartItem(cartItemId)
    res.status(200).json({ success: true, message })
})
const updateCartItem = asyncHandler(async (req, res, next) => {
    const { cartItemId } = req.params;
    const { quantity } = req.body;
    const { message } = await cartItemService.updateCartItem(cartItemId, quantity)
    res.status(200).json({ success: true, message })
})


module.exports = {
    getCart,
    getAllCarts,
    getCart,
    addCartItem,
    deleteCartItem,
    updateCartItem
}