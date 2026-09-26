import AppError from "../errors/app-error.js";

export const validateRequest = (schemas) => (req, res, next) => {
	const validated = {};

	for (const [source, schema] of Object.entries(schemas)) {
		const result = schema.safeParse(req[source]);
		if (!result.success) {
			const details = result.error.issues.map((issue) => ({
				path: issue.path.join("."),
				message: issue.message,
			}));
			return next(new AppError("Request validation failed", 400, details));
		}
		validated[source] = result.data;
	}

	req.validated = validated;
	return next();
};