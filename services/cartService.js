const Cart = require("../models/cartModel");
const OrderItems = require("../models/cartItemsModel");
const Product = require("../models/productsModel");

// @desc Create a cart for a user
// @route POST /api/cart
// @access User
const createCart = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ message: "userId is required" });
        const existing = await Cart.findOne({ userId });
        if (existing) return res.status(200).json({ cart: existing });
        const cart = await Cart.create({ userId });
        res.status(201).json({ message: "Cart created", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating cart" });
    }
};

// @desc Add item to cart
// @route POST /api/cart/:cartId/items
// @access User
const addItemToCart = async (req, res) => {
    try {
        const { cartId } = req.params;
        const { productId, quantity = 1, color, size } = req.body;
        if (!productId) return res.status(400).json({ message: "productId required" });
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });
        const item = await OrderItems.create({ cartId, productId, quantity, color, size });
        res.status(201).json({ message: "Item added", item });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding item to cart" });
    }
};

// @desc Get cart with items by user id
// @route GET /api/cart/user/:userId
// @access User
const getCartByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        const items = await OrderItems.find({ cartId: cart._id }).populate("productId");
        res.status(200).json({ cart, items });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching cart" });
    }
};

// @desc Remove item from cart
// @route DELETE /api/cart/items/:itemId
// @access User
const removeItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const item = await OrderItems.findByIdAndDelete(itemId);
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.status(200).json({ message: "Item removed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error removing item" });
    }
};

// @desc Update cart item quantity
// @route PUT /api/cart/items/:itemId
// @access User
const updateItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const updates = req.body;
        const item = await OrderItems.findByIdAndUpdate(itemId, updates, { new: true });
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.status(200).json({ message: "Item updated", item });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating item" });
    }
};

module.exports = { createCart, addItemToCart, getCartByUserId, removeItem, updateItem };

