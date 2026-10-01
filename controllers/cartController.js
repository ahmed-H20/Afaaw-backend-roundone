const cartService = require("../services/cartService");

exports.createCart = async (req, res, next) => {
    return cartService.createCart(req, res, next);
};

exports.addItemToCart = async (req, res, next) => {
    return cartService.addItemToCart(req, res, next);
};

exports.getCartByUserId = async (req, res, next) => {
    return cartService.getCartByUserId(req, res, next);
};

exports.removeItem = async (req, res, next) => {
    return cartService.removeItem(req, res, next);
};

exports.updateItem = async (req, res, next) => {
    return cartService.updateItem(req, res, next);
};
