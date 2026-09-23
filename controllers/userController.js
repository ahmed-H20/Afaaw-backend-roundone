const userService = require("../services/userService");
const catchAsync = require("../utils/catchAsync");

exports.createUser = catchAsync(async (req, res, next) => {
    return userService.createUser(req, res, next);
});

exports.getUserById = catchAsync(async (req, res, next) => {
    return userService.getUserById(req, res, next);
});
