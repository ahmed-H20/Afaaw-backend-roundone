const CartItems = require("../models/cartItemModel");

const cartItemRepository = {
    findItemInCart: async (cartId, productId, color, size) => {
        const query = {
            cartId,
            productId
        };

        if (color !== undefined) { query.color = color }

        if (size !== undefined) { query.size = size };
        return await CartItems.findOne(query)
    },
    createCartItem: async (cartId, productId, quantity, color, size) => {
        const data = {
            cartId,
            productId,
            quantity
        };

        if (color !== undefined) { data.color = color }

        if (size !== undefined) { data.size = size };
        return await CartItems.create(data)
    },
    updateCartItem: async (cartItemId, newQuantity) => {
        return await CartItems.findOneAndUpdate({_id:cartItemId},{$inc: {quantity:newQuantity}},{new:true})
    },
    getCartItems: async (cartId) => {
        return await CartItems.find({cartId}).populate("productId")
    },
    getCartItemById: async (cartItemId) => {
        return await CartItems.findById(cartItemId)
    },
    deleteCartItem: async (cartItemId) => {
        return await CartItems.findByIdAndDelete(cartItemId)
    }
}
module.exports = cartItemRepository;