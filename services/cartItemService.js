const Product = require("../models/productsModel")
const cartRepository = require("../repository/cart.repository")
const cartItemRepository = require("../repository/cartItem.repository")
const userRepository = require("../repository/user.repository")
const isValidId = require("../utils/isValidId")

// @desc add item to cart
// @route POST /api/cart/items/add
// @access User
const addCartItem = async (userId, productId, quantity, color, size) => {
    isValidId(userId, "User")
    isValidId(productId, "Product")

    const user = await userRepository.getUserById(userId)

    if (!user) {
        throw new AppError("User not found", 404)
    }
    const product = await Product.findById(productId);
    if (!product) {
        throw new AppError("Product not found", 404)
    }

    let cart = await cartRepository.getCartByUserId(userId)

    if (!cart) {
        cart = await cartRepository.createCart(userId)
    }

    const cartItem = await cartItemRepository.findItemInCart(
        cart._id,
        productId,
        color,
        size
    )

    if (cartItem) {
        await cartItemRepository.updateCartItem(cartItem._id, quantity)
    } else {
        await cartItemRepository.createCartItem(
            cart._id,
            productId,
            quantity,
            color,
            size
        )
    }

    return { message: "Cart item added successfully" }
}

// @desc delete item from cart
// @route DELETE /api/cart/items/add
// @access User
const deleteCartItem = async (cartItemId) => {
    isValidId(cartItemId, "Cart Item")
    const getCartItem = await cartItemRepository.getCartItemById(cartItemId)
    if (!getCartItem)
        throw new AppError("Cart item not found", 404)
    await cartItemRepository.deleteCartItem(cartItemId)
    return { message: "Cart item deleted successfully" }
}
// @desc update cart item
// @route PATCH /api/cart/items/:cartItemId
// @access User
const updateCartItem = async (cartItemId, quantity) => {
    isValidId(cartItemId, "Cart Item")
    const getCartItem = await cartItemRepository.getCartItemById(cartItemId)
    if (!getCartItem)
        throw new AppError("Cart item not found", 404);
    if (getCartItem.quantity + quantity <= 0)
        await cartItemRepository.deleteCartItem(cartItemId)
    else
        await cartItemRepository.updateCartItem(cartItemId, quantity)
    return { message: "Cart item updated successfully" }
}

module.exports = {
    addCartItem,
    deleteCartItem,
    updateCartItem
}