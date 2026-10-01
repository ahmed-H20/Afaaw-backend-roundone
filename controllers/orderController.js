const orderService = require("../services/orderService");

exports.createOrder = async (req, res, next) => {
    return orderService.createOrder(req, res, next);
};

exports.getOrderById = async (req, res, next) => {
    return orderService.getOrderById(req, res, next);
};

exports.updateOrderStatus = async (req, res, next) => {
    return orderService.updateOrderStatus(req, res, next);
};
