const AppError = require("../errors/appError");
const userRepository = require("../repository/user.repository");

const registerService = async (fullName,email,password)=>{
    const existedEmail = await userRepository.findUserByEmail(email);
    if(existedEmail) {
        throw new AppError("Email already exists",400)
    }
    const newUser = await userRepository.createUser(fullName,email,password);
    
    return {user:newUser, message:"User registered successfully"}
}

module.exports = {
    registerService
}