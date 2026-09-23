const User = require("../models/userModels.js")

const userRepository = {
    getUserById: async (id) => {
        return await User.findById(id);
    },
    createUser: async(fullName,email,password) => {
        return await User.create({fullName,email,password});
    },
    getUserByEmail: async (email) => {
        return await User.findOne({email});
    }
}

module.exports = userRepository;