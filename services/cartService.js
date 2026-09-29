const AppError = require("../errors/appError");
const cartRepository = require("../repository/cart.repository");
const cartItemRepository = require("../repository/cartItem.repository");
const userRepository = require("../repository/user.repository");
const isValidId = require("../utils/isValidId");


// @desc create cart function
const createCart = async (userId) => {
    if (!userId) {
        throw new AppError("User ID is required", 400);
    }
    const cart = await cartRepository.createCart(userId)
    return cart
}

// @desc get  cart
// @route GET /api/cart/
// @access user
const getCart = async (userId) => {
    isValidId(userId, "User")
    const user = await userRepository.getUserById(userId)

    if (!user) {
        throw new AppError("User not found", 404)
    }

    let cart = await cartRepository.getCartByUserId(userId)

    if (!cart) {
        cart = await cartRepository.createCart(userId)
        return { cartItems: [] };
    }
    const cartItems = await cartItemRepository.getCartItems(cart._id)
    return { cartItems };

}


// @desc get all carts
// @route GET /api/cart
// @access Admin
const getAllCarts = async (page, limit) => {
    const skip = (page - 1) * limit;
    const [cartData, totalCart] = await Promise.all([
        cartRepository.getAllCarts(skip, limit),
        cartRepository.getCountCart()
    ]);
    const totalPages = Math.ceil(totalCart / limit);

    return { cartData, totalCart, totalPages, currentPage: page, limitation: limit };
}

module.exports = {
    getCart,
    createCart,
    getAllCarts
}