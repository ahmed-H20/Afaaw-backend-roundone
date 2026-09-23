const express = require('express');
const router = express.Router();

const {
	createUser,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
} = require('../services/userService');

const {
	createUserValidator,
	updateUserValidator,
	userIdValidator,
} = require('../utils/validation/userValidation');

router.post('/', createUserValidator, createUser);
router.get('/', getAllUsers);
router.get('/:id', userIdValidator, getUserById);
router.put('/:id', updateUserValidator, updateUser);
router.delete('/:id', userIdValidator, deleteUser);

module.exports = router;
