const asyncHandler = require("express-async-handler");
const { registerService } = require("../services/userService");

const registerController = asyncHandler(async (req, res, next) => {
    const { fullName, email, password } = req.body;
    const { user, message } = await registerService(fullName, email, password);
    res.status(201).json({ success: true, message, user });
})

module.exports = {
    registerController
}