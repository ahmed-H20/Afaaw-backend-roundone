const User = require('../models/userModels');

// @desc Register / Create a new user
// @route POST /api/users
// @access Public
const createUser = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res
				.status(400)
				.json({ message: 'Name, email, and password are required' });
		}
		const user = await User.create(req.body);
		res.status(201).json({ message: 'User created successfully', user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error creating user' });
	}
};

// @desc Get all users
// @route GET /api/users
// @access Admin
const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find().select('-password');
		res.status(200).json({ users });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error fetching users' });
	}
};

// @desc Get user by ID
// @route GET /api/users/:id
// @access Admin
const getUserById = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id).select('-password');
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json({ user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error fetching user' });
	}
};

// @desc Update user
// @route PUT /api/users/:id
// @access Private
const updateUser = async (req, res, next) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		}).select('-password');
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json({ message: 'User updated successfully', user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error updating user' });
	}
};

// @desc Delete user
// @route DELETE /api/users/:id
// @access Admin
const deleteUser = async (req, res, next) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json({ message: 'User deleted successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error deleting user' });
	}
};

module.exports = {
	createUser,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
};
