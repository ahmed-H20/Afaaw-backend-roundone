const User = require("../models/userModels");

const createUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) return res.status(400).json({ message: "fullName, email and password are required" });
        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ message: "Email already registered" });
        const user = await User.create({ fullName, email, password });
        res.status(201).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user" });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching user" });
    }
};

module.exports = { createUser, getUserById };
