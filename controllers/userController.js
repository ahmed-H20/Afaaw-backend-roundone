const userService = require("../services/userService");

exports.createUser = async (req, res, next) => {
    return userService.createUser(req, res, next);
};

exports.loginUser = async (req, res, next) => {
    return userService.loginUser(req, res, next);
};

exports.forgotPassword = async (req, res, next) => {
    return userService.forgotPassword(req, res, next);
};

exports.verifyOtp = async (req, res, next) => {
    return userService.verifyOtp(req, res, next);
};

exports.resetPassword = async (req, res, next) => {
    return userService.resetPassword(req, res, next);
};

exports.getUserById = async (req, res, next) => {
    return userService.getUserById(req, res, next);
};

exports.getMe = async (req, res, next) => {
    return userService.getMe(req, res, next);
};
