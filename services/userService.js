const AppError = require("../errors/appError");
const userRepository = require("../repository/user.repository");
const bcrypt = require("bcrypt");
const  generateAccessToken  = require("../utils/generateToken");

const registerService = async (fullName, email, password) => {
    const existedEmail = await userRepository.getUserByEmail(email);
    if (existedEmail) {
        throw new AppError("Email already exists", 400)
    }
    const newUser = await userRepository.createUser(fullName, email, password);
    const token = await generateAccessToken(newUser._id)
    const data = { fullName: newUser.fullName, email: newUser.email, token }

    return { data, message: "User registered successfully" }
}

const logInService = async (email, password) => {
    const user = await userRepository.getUserByEmailWithPassword(email);
    if (!user) {
        throw new AppError("Email or password invalid", 400)
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
        throw new AppError("Email or password invalid", 400)
    }
    const token = await generateAccessToken(user._id)
    const data = { fullName: user.fullName, email: user.email, token }

    return { data, message: "User Login  successfully" }
}

module.exports = {
    registerService,
    logInService
}