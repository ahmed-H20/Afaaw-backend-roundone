const Cart = require("../models/cart.model");

const createCart = async (data) => {
  return await Cart.create(data);
};

const getAllCarts = async () => {
  return await Cart.find().populate("userId", "-password");
};

const getCartById = async (id) => {
  return await Cart.findById(id).populate("userId", "-password");
};

const getCartByUserId = async (userId) => {
  return await Cart.findOne({ userId }).populate("userId", "-password");
};

const updateCart = async (id, data) => {
  return await Cart.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).populate("userId", "-password");
};

const deleteCart = async (id) => {
  return await Cart.findByIdAndDelete(id);
};

module.exports = {
  createCart,
  getAllCarts,
  getCartById,
  getCartByUserId,
  updateCart,
  deleteCart,
};