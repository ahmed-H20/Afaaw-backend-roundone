import * as authService from "../services/auth.service.js";

export const register = async (req, res) => {
	const result = await authService.register(req.validated.body);
	res.status(202).json(result);
};

export const verifyEmail = async (req, res) => {
	const result = await authService.verifyEmail(req.validated.body);
	res.json(result);
};

export const resendVerification = async (req, res) => {
	const result = await authService.resendVerification(req.validated.body.email);
	res.json(result);
};

export const login = async (req, res) => {
	const result = await authService.login(req.validated.body);
	res.json(result);
};

export const getMe = async (req, res) => {
	res.json({ user: authService.getCurrentUser(req.authUser) });
};

export const requestPasswordReset = async (req, res) => {
	const result = await authService.requestPasswordReset(req.validated.body.email);
	res.json(result);
};

export const resetPassword = async (req, res) => {
	const result = await authService.resetPassword(req.validated.body);
	res.json(result);
};

export const changePassword = async (req, res) => {
	const result = await authService.changePassword(req.auth.id, req.validated.body);
	res.json(result);
};
