const asyncHandler = require("express-async-handler");
const { registerService, logInService } = require("../services/userService");

const registerController = asyncHandler(async (req, res, next) => {
    const { fullName, email, password } = req.body;
    const { data, message } = await registerService(fullName, email, password);
    res.status(201).json({ success: true, message, data });
})

const logInController = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const { data, message } = await logInService(email, password);
    res.status(201).json({ success: true, message, data });
})

module.exports = {
    registerController,
    logInController
}