import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import getEmailTransporter from "../config/email.js";

const CODE_LENGTH = 6;
const DEFAULT_CODE_TTL_MS = 10 * 60 * 1000;

const getVerificationSecret = () => {
	const secret = process.env.EMAIL_VERIFICATION_SECRET;
	if (!secret || secret.length < 32) {
		throw new Error("EMAIL_VERIFICATION_SECRET must contain at least 32 characters.");
	}
	return secret;
};

export const sendEmail = async ({ to, subject, text, html }) => {
	if (!to || !subject || (!text && !html)) {
		throw new TypeError("Email requires a recipient, subject, and text or HTML body.");
	}

	const from = process.env.SMTP_FROM || process.env.SMTP_USER;
	if (!from) {
		throw new Error("SMTP_FROM or SMTP_USER must be configured as the sender address.");
	}

	return getEmailTransporter().sendMail({ from, to, subject, text, html });
};

export const generateVerificationCode = () =>
	randomInt(0, 10 ** CODE_LENGTH).toString().padStart(CODE_LENGTH, "0");

export const hashVerificationCode = (code) => {
	if (typeof code !== "string" || !/^\d{6}$/.test(code)) {
		throw new TypeError("Verification code must be a six-digit string.");
	}
	return createHmac("sha256", getVerificationSecret()).update(code).digest("hex");
};

export const createVerificationCode = (ttlMs = DEFAULT_CODE_TTL_MS) => {
	if (!Number.isSafeInteger(ttlMs) || ttlMs <= 0) {
		throw new RangeError("Verification code lifetime must be a positive safe integer.");
	}

	const code = generateVerificationCode();
	return {
		code,
		codeHash: hashVerificationCode(code),
		expiresAt: new Date(Date.now() + ttlMs),
	};
};

export const verifyVerificationCode = ({ code, codeHash, expiresAt }) => {
	if (
		typeof code !== "string" ||
		!/^\d{6}$/.test(code) ||
		typeof codeHash !== "string" ||
		!/^[a-f\d]{64}$/i.test(codeHash) ||
		!expiresAt
	) {
		return false;
	}

	const expiry = new Date(expiresAt).getTime();
	if (!Number.isFinite(expiry) || expiry <= Date.now()) return false;

	const actualHash = Buffer.from(hashVerificationCode(code), "hex");
	const expectedHash = Buffer.from(codeHash, "hex");
	return actualHash.length === expectedHash.length && timingSafeEqual(actualHash, expectedHash);
};

export const sendVerificationCode = async ({ to, code, expiresInMinutes = DEFAULT_CODE_TTL_MS / 60_000 }) => {
	if (typeof code !== "string" || !/^\d{6}$/.test(code)) {
		throw new TypeError("Verification code must be a six-digit string.");
	}
	if (!Number.isSafeInteger(expiresInMinutes) || expiresInMinutes <= 0) {
		throw new RangeError("Verification code lifetime must be a positive number of minutes.");
	}

	return sendEmail({
		to,
		subject: "Your verification code",
		text: `Your verification code is ${code}. It expires in ${expiresInMinutes} minutes.`,
		html: `<p>Your verification code is <strong>${code}</strong>.</p><p>It expires in ${expiresInMinutes} minutes.</p>`,
	});
};

export const sendPasswordResetCode = async ({ to, code, expiresInMinutes = 10 }) => {
	if (typeof code !== "string" || !/^\d{6}$/.test(code)) {
		throw new TypeError("Password reset code must be a six-digit string.");
	}
	if (!Number.isSafeInteger(expiresInMinutes) || expiresInMinutes <= 0) {
		throw new RangeError("Password reset code lifetime must be a positive number of minutes.");
	}

	return sendEmail({
		to,
		subject: "Your password reset code",
		text: `Your password reset code is ${code}. It expires in ${expiresInMinutes} minutes. If you did not request this, ignore this email.`,
		html: `<p>Your password reset code is <strong>${code}</strong>.</p><p>It expires in ${expiresInMinutes} minutes. If you did not request this, ignore this email.</p>`,
	});
};