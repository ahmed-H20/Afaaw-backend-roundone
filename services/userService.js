const User = require('../models/userModels')
const Cart = require('../models/cartModel')
const bcrypt = require('bcrypt')

// @desc Create a new User
// @route POST /api/users
// @access Public
const creatUser = async(req ,res) => {
    const {fullName , email , password} = req.body
    if(!fullName || !email || !password){
        return res.status(400).json({msg : "name , email and password is required"})
    }
    try { 
        const oldUser = await User.findOne({email : email})
    if(oldUser){
        return res.status(400).json({msg : "user already exists"})
    }
            const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword
        })
        const cart = await Cart.create({
        userId: newUser._id
        })

        res.status(201).json({message: "User created successfully" , newUser})
    } catch (error) {
        console.log(error)  
        return res.status(500).json({
        msg: "Server error"
    })
    }
}

// @desc get all users 
// @route get /api/users
// @access Admin
const getAllUser = async (req , res) => {
try {
    const users = await User.find()
    if(users.length == 0){
        return res.status(404).json({msg : "no users found"})
    }
    res.status(200).json({users})
} catch (error) {
    console.log(error)
    return res.status(500).json({
        msg: "Server error"
    })
}
}

// @desc get User by id
// @route get /api/users/:id
// @access Admin
const getSingleUser = async (req , res) => {
try {
    const userId = req.params.id
    const user = await User.findById(userId)
    if(!user){
        return res.status(404).json({msg : "user not found"})
    }
    res.status(200).json({user})
} catch (error) {
    console.log(error)
    return res.status(500).json({
        msg: "Server error"
    })
}
}

// @desc update User 
// @route put /api/users
// @access Admin
const updateUser =async (req ,res ) => {
    try {
        const userId = req.params.id
        const user = await User.findByIdAndUpdate(userId , req.body , {new : true})
        if(!user){
        return res.status(404).json({msg : "user not found"})
    }
    res.status(200).json({user})
    } catch (error) {
        console.log(error)
        return res.status(500).json({
        msg: "Server error"
    })
    }
}


// @desc delete User 
// @route delete /api/users
// @access Admin
const deleteUser = async (req , res) => {
    try {
        const userId = req.params.id
        const user = await User.findByIdAndDelete(userId)
        if(!user){
        return res.status(404).json({msg : "user not found"})
    }
    res.status(200).json({msg : "deleted success" , data :null})
    } catch (error) {
        console.log(error)
        return res.status(500).json({
        msg: "Server error"
    })
    }
}


module.exports= {
    creatUser ,
    getAllUser ,
    getSingleUser ,
    updateUser ,
    deleteUser

}