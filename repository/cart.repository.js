const cartRepository = {
    getCartByUserId: async (userId) => {
        return await Cart.findOne({ userId: userId });
    },

    createCart: async (userId) => {
        return await Cart.create({ userId: userId });
    },

    deleteCart: async (userId) => {
        return await Cart.findOneAndDelete({userId});
    },
    getAllCarts: async (skip, limit) => {
        return await Cart.find().skip(skip).limit(limit);
    },
    getCountCart: async () => {
        return await Cart.countDocuments();
    },

}
module.exports = cartRepository;