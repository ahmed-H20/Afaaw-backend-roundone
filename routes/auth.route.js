import express from "express";
import { rateLimit } from "express-rate-limit";
import * as authController from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { validateRequest } from "../middleware/validate-request.js";
import {
	loginBodySchema,
	changePasswordBodySchema,
	registerBodySchema,
	requestPasswordResetBodySchema,
	resendVerificationBodySchema,
	resetPasswordBodySchema,
	verifyEmailBodySchema,
} from "../validations/auth.validation.js";

const router = express.Router();
const authRateLimit = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 10,
	standardHeaders: "draft-8",
	legacyHeaders: false,
	message: { success: false, message: "Too many authentication requests. Try again later." },
});
const loginRateLimit = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 3,
	standardHeaders: "draft-8",
	legacyHeaders: false,
	message: { success: false, message: "Too many login attempts. Try again later." },
});
const credentialRateLimit = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 5,
	standardHeaders: "draft-8",
	legacyHeaders: false,
	message: { success: false, message: "Too many authentication attempts. Try again later." },
});
const passwordChangeRateLimit = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 5,
	standardHeaders: "draft-8",
	legacyHeaders: false,
	message: { success: false, message: "Too many password changes. Try again later." },
});

router.post("/register", authRateLimit, validateRequest({ body: registerBodySchema }), authController.register);
router.post(
	"/verify-email",
	credentialRateLimit,
	validateRequest({ body: verifyEmailBodySchema }),
	authController.verifyEmail,
);
router.post(
	"/resend-verification",
	credentialRateLimit,
	validateRequest({ body: resendVerificationBodySchema }),
	authController.resendVerification,
);
router.post("/login", loginRateLimit, validateRequest({ body: loginBodySchema }), authController.login);
router.post(
	"/forgot-password",
	credentialRateLimit,
	validateRequest({ body: requestPasswordResetBodySchema }),
	authController.requestPasswordReset,
);
router.post(
	"/reset-password",
	credentialRateLimit,
	validateRequest({ body: resetPasswordBodySchema }),
	authController.resetPassword,
);
router.patch(
	"/change-password",
	passwordChangeRateLimit,
	authenticate,
	validateRequest({ body: changePasswordBodySchema }),
	authController.changePassword,
);
router.get("/me", authenticate, authController.getMe);

export default router;
