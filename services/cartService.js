const Cart = require('../models/cartModel')
const CartItem = require('../models/cartItemsModel')


// @desc Get all carts
// @route GET /api/carts
// @access Admin
const getAllCart = async(req , res ) => {
    try {
        const carts = await Cart.find()
        res.status(200).json({carts})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg : error.message})
    }
}

// @desc Get a cart by ID
// @route GET /api/carts/:id
// @access User / Admin
const getCartById = async (req , res) => {
    try {
        const cartId = req.params.id
        const cart = await Cart.findById(cartId);
        if(!cart){
            return res.status(404).json({msg : "cart not found"})
        }
        res.status(200).json({cart})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg : error.message})
    }
}


// @desc Get a cart by User ID
// @route GET /api/carts/user/:userId
// @access User / Admin
const getCartByUserId = async (req, res) => {
try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
    return res.status(404).json({ message: "Cart not found for this user" });
    }
    res.status(200).json({ cart });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cart" });
}
};



// @desc add product to cart
// @route post /api/carts/user/add
// @access user
const addProductToCart = async(req , res) => {
    try {
            const {userId , productId , quantity} = req.body
    let cart = await Cart.findOne({userId})
    if(!cart){
        cart = await Cart.create({userId})
    }
    const existItem = await CartItem.findOne({cartId : cart._id , productId})
    if(existItem){
        existItem.quantity += quantity
        await existItem.save()
        return res.status(200).json({msg : "product quantity update" , 
            cartItem : existItem
        })
    }
    const cartItem = await CartItem.create({
        cartId : cart._id ,
        productId ,
        quantity
    })
    res.status(201).json({msg: "Product added to cart", cartItem});
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg : error.message})
    }
}

// @desc delete product from cart
// @route post /api/carts/user/remove
// @access user
const deleteProductFromCArt = async(req ,res) => {
    try {
        const {userId , productId} = req.body
        const cart = await Cart.findOne({userId})
        if(!cart){
            return res.status(404).json({msg : "cart not found"})
        }
        const cartItem = await CartItem.findOneAndDelete({cartId : cart._id , productId})
        if (!cartItem) {
        return res.status(404).json({
        message: "Product not found in cart"});
        }
        res.status(200).json({ message: "Product removed from cart"})
    } catch (error) {
            console.error(error);
    res.status(500).json({
    message: "Error deleting product from cart"
    });
    }
}

module.exports = {
    getAllCart ,
    getCartById ,
    getCartByUserId ,
    addProductToCart ,
    deleteProductFromCArt
}