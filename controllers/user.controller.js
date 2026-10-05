import * as userService from "../services/user.service.js";

export const listUsers = async (req, res) => {
	res.json(await userService.listUsers(req.validated.query));
};

export const getUserById = async (req, res) => {
	res.json({ user: await userService.getUserById(req.validated.params.id) });
};

export const createUser = async (req, res) => {
	res.status(201).json({
		message: "User created. The account must verify its email before sign-in.",
		user: await userService.createUser(req.validated.body),
	});
};

export const updateUser = async (req, res) => {
	res.json({
		user: await userService.updateUser(req.validated.params.id, req.validated.body, req.auth.id),
	});
};

export const deleteUser = async (req, res) => {
	const user = await userService.deleteUser(req.validated.params.id, req.auth.id);
	res.json({ message: "User deactivated successfully", user });
};