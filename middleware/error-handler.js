import mongoose from "mongoose";
import { ZodError } from "zod";
import AppError from "../errors/app-error.js";

const normalizeError = (error) => {
	if (error instanceof AppError) return error;

	if (error instanceof ZodError) {
		const details = error.issues.map((issue) => ({
			path: issue.path.join("."),
			message: issue.message,
		}));
		return new AppError("Request validation failed", 400, details);
	}

	if (error instanceof mongoose.Error.ValidationError) {
		const details = Object.values(error.errors).map((issue) => ({
			path: issue.path,
			message: issue.message,
		}));
		return new AppError("Request validation failed", 400, details);
	}

	if (error instanceof mongoose.Error.CastError) {
		return new AppError("Invalid resource identifier", 400);
	}

	if (error?.code === 11000) {
		return new AppError("A record with this value already exists", 409);
	}

	if (error?.type === "entity.parse.failed") {
		return new AppError("Malformed request", 400);
	}

	if (error?.type === "entity.too.large") {
		return new AppError("Request payload is too large", 413);
	}

	if (Number.isInteger(error?.status) && error.status >= 400 && error.status < 500) {
		return new AppError(error.message || "Invalid request", error.status);
	}

	return new AppError("Internal server error", 500);
};

export const notFoundHandler = (req, res, next) => {
	return next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

export const errorHandler = (error, req, res, next) => {
	if (res.headersSent) return next(error);

	const normalizedError = normalizeError(error);
	const response = {
		success: false,
		message: normalizedError.message,
	};

	if (normalizedError.details) response.details = normalizedError.details;
	if (process.env.NODE_ENV !== "production" && normalizedError.statusCode === 500) {
		response.stack = error.stack;
	}

	if (normalizedError.statusCode >= 500) {
		console.error(error);
	}

	return res.status(normalizedError.statusCode).json(response);
};