import jwt from "jsonwebtoken";
import AppError from "../errors/app-error.js";
import User from "../models/user.model.js";
import { getJwtSecret } from "../services/auth.service.js";

export const authenticate = async (req, res, next) => {
	const authorization = req.get("authorization");
	if (!authorization?.startsWith("Bearer ")) {
		return next(new AppError("Authentication required", 401));
	}

	const secret = getJwtSecret();
	try {
		const token = authorization.slice("Bearer ".length).trim();
		const payload = jwt.verify(token, secret, { algorithms: ["HS256"] });
		if (typeof payload !== "object" || typeof payload.sub !== "string") {
			return next(new AppError("Invalid or expired access token", 401));
		}

		const user = await User.findById(payload.sub)
			.select("name email role active verified +tokenVersion")
			.lean();
		if (!user || !user.active || !user.verified) {
			return next(new AppError("Authentication required", 401));
		}
		if (!Number.isInteger(payload.ver) || payload.ver !== (user.tokenVersion ?? 0)) {
			return next(new AppError("Invalid or expired access token", 401));
		}

		req.auth = { id: String(user._id), role: user.role };
		req.authUser = user;
		return next();
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			return next(new AppError("Invalid or expired access token", 401));
		}
		return next(error);
	}
};

export const authorizeRoles = (...roles) => (req, res, next) => {
	if (!req.auth || !roles.includes(req.auth.role)) {
		return next(new AppError("You are not allowed to perform this action", 403));
	}
	return next();
};
