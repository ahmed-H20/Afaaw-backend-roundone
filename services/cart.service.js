const Cart = require("../models/cart.model");
const ApiError = require("../utils/ApiError");
const httpStatusText = require("../constants/httpStatusText");

const createCart = async (data) => {
  return await Cart.create(data);
};

const getAllCarts = async () => {
  return await Cart.find().populate("userId", "-password");
};

const getCartById = async (id) => {
  const cart = await Cart.findById(id).populate("userId", "-password");

  if (!cart) {
    throw new ApiError(404, "Cart not found", httpStatusText.FAIL);
  }

  return cart;
};

const getCartByUserId = async (userId) => {
  const cart = await Cart.findOne({ userId }).populate("userId", "-password");

  if (!cart) {
    throw new ApiError(404, "Cart not found", httpStatusText.FAIL);
  }

  return cart;
};

const updateCart = async (id, data) => {
  const cart = await Cart.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  }).populate("userId", "-password");

  if (!cart) {
    throw new ApiError(404, "Cart not found", httpStatusText.FAIL);
  }

  return cart;
};

const deleteCart = async (id) => {
  const cart = await Cart.findByIdAndDelete(id);

  if (!cart) {
    throw new ApiError(404, "Cart not found", httpStatusText.FAIL);
  }

  return cart;
};

module.exports = {
  createCart,
  getAllCarts,
  getCartById,
  getCartByUserId,
  updateCart,
  deleteCart,
};
