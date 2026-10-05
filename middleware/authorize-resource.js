import AppError from "../errors/app-error.js";
import Order from "../models/order.model.js";
import { Review } from "../models/review.model.js";

export const authorizeSelfOrAdmin = (paramName = "userId") => (req, res, next) => {
	if (req.auth?.role === "admin" || req.auth?.id === req.params[paramName]) return next();
	return next(new AppError("You are not allowed to access this account resource", 403));
};

export const authorizeOrderAccess = async (req, res, next) => {
	try {
		const order = await Order.findById(req.params.id).select("userId status").lean();
		if (!order) return next(new AppError("Order not found", 404));
		req.order = order;
		if (req.auth?.role === "admin" || String(order.userId) === req.auth?.id) {
			if (req.method === "PATCH" && req.auth.role !== "admin" &&
				(req.validated.body.status !== "cancelled" || order.status !== "pending")) {
				return next(new AppError("Only admins can update this order status", 403));
			}
			return next();
		}
		return next(new AppError("You are not allowed to access this order", 403));
	} catch (error) {
		return next(error);
	}
};

export const authorizeReviewAccess = async (req, res, next) => {
	try {
		const review = await Review.findById(req.params.id).select("userId").lean();
		if (!review) return next(new AppError("Review not found", 404));
		if (req.auth?.role === "admin" || String(review.userId) === req.auth?.id) return next();
		return next(new AppError("You are not allowed to access this review", 403));
	} catch (error) {
		return next(error);
	}
};
