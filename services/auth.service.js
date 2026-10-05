import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../errors/app-error.js";
import User from "../models/user.model.js";
import {
	createVerificationCode,
	sendPasswordResetCode,
	sendVerificationCode,
	verifyVerificationCode,
} from "../utils/email.js";

const RESET_CODE_TTL_MS = 10 * 60 * 1000;
const MAX_RESET_CODE_ATTEMPTS = 5;

export const getJwtSecret = () => {
	const secret = process.env.JWT_SECRET;
	if (!secret || Buffer.byteLength(secret) < 32) {
		throw new Error("JWT_SECRET must contain at least 32 bytes.");
	}
	return secret;
};

const issueVerificationCode = async (user) => {
	const challenge = createVerificationCode();
	user.verificationToken = challenge.codeHash;
	user.verificationExpires = challenge.expiresAt;
	await user.save();
	try {
		await sendVerificationCode({ to: user.email, code: challenge.code });
	} catch(error) {
		console.error("Verification email delivery failed");
		console.info("Error details:", error);
	}
};

export const register = async ({ name, email, password }) => {
	const existingUser = await User.findOne({ email: email.toLowerCase() });
	if (existingUser) {
		throw new AppError("Email is already registered", 400);
	}
	const user = new User({ name, email: email.toLowerCase(), password });
	await user.save();
	await issueVerificationCode(user);

	return { message: "Registration successful. A verification code has been sent to your email." };
};

export const verifyEmail = async ({ email, code }) => {
	const user = await User.findOne({ email: email.toLowerCase() }).select(
		"+verificationToken +verificationExpires",
	);
	if (!user || user.verified || !user.verificationToken || !user.verificationExpires) {
		throw new AppError("Verification code is invalid or expired", 400);
	}
	if (!verifyVerificationCode({ code, codeHash: user.verificationToken, expiresAt: user.verificationExpires })) {
		throw new AppError("Verification code is invalid or expired", 400);
	}

	const verifiedUser = await User.findOneAndUpdate(
		{
			_id: user._id,
			verified: false,
			verificationToken: user.verificationToken,
			verificationExpires: { $gt: new Date() },
		},
		{
			$set: { verified: true },
			$unset: { verificationToken: 1, verificationExpires: 1 },
		},
		{ returnDocument: "after", runValidators: true },
	);
	if (!verifiedUser) throw new AppError("Verification code is invalid or expired", 400);
	return { message: "Email verified successfully" };
};

export const resendVerification = async (email) => {
	const user = await User.findOne({ email: email.toLowerCase() });
	if (user && !user.verified) await issueVerificationCode(user);
	return { message: "If an unverified account exists, a verification code has been sent." };
};

export const login = async ({ email, password }) => {
	const user = await User.findOne({ email: email.toLowerCase() }).select("+password +tokenVersion");
	if (!user || !(await user.comparePassword(password)) || !user.active || !user.verified) {
		throw new AppError("Invalid email or password", 401);
	}
	const expiresIn = process.env.JWT_EXPIRES_IN || "15m";
	return {
		accessToken: jwt.sign(
			{ sub: user.id, ver: user.tokenVersion ?? 0 },
			getJwtSecret(),
			{ algorithm: "HS256", expiresIn },
		),
		tokenType: "Bearer",
		expiresIn,
		user: { id: user.id, name: user.name, email: user.email, role: user.role },
	};
};

export const requestPasswordReset = async (email) => {
	const user = await User.findOne({ email: email.toLowerCase(), active: true, verified: true });
	if (user) {
		const challenge = createVerificationCode(RESET_CODE_TTL_MS);
		user.resetPasswordCode = challenge.codeHash;
		user.resetPasswordExpires = challenge.expiresAt;
		user.resetPasswordAttempts = 0;
		await user.save();
		try {
			await sendPasswordResetCode({
				to: user.email,
				code: challenge.code,
				expiresInMinutes: RESET_CODE_TTL_MS / 60_000,
			});
		} catch {
			console.error("Password reset email delivery failed");
			await User.updateOne(
				{ _id: user._id, resetPasswordCode: challenge.codeHash },
				{ $unset: { resetPasswordCode: 1, resetPasswordExpires: 1 }, $set: { resetPasswordAttempts: 0 } },
			);
		}
	}
	return { message: "If an eligible account exists, password reset instructions have been sent." };
};

export const resetPassword = async ({ email, code, password }) => {
	const user = await User.findOne({ email: email.toLowerCase(), active: true, verified: true }).select(
		"+resetPasswordCode +resetPasswordExpires +resetPasswordAttempts",
	);
	if (!user?.resetPasswordCode || !user.resetPasswordExpires || user.resetPasswordExpires <= new Date()) {
		throw new AppError("Reset code is invalid or expired", 400);
	}
	if ((user.resetPasswordAttempts ?? 0) >= MAX_RESET_CODE_ATTEMPTS) {
		throw new AppError("Reset code is invalid or expired", 400);
	}

	const codeIsValid = verifyVerificationCode({
		code,
		codeHash: user.resetPasswordCode,
		expiresAt: user.resetPasswordExpires,
	});
	if (!codeIsValid) {
		await User.updateOne(
			{
				_id: user._id,
				resetPasswordCode: user.resetPasswordCode,
				resetPasswordExpires: { $gt: new Date() },
				resetPasswordAttempts: { $lt: MAX_RESET_CODE_ATTEMPTS },
			},
			{ $inc: { resetPasswordAttempts: 1 } },
		);
		await User.updateOne(
			{ _id: user._id, resetPasswordAttempts: { $gte: MAX_RESET_CODE_ATTEMPTS } },
			{ $unset: { resetPasswordCode: 1, resetPasswordExpires: 1 } },
		);
		throw new AppError("Reset code is invalid or expired", 400);
	}

	const passwordHash = await bcrypt.hash(password, await bcrypt.genSalt(12));
	const updatedUser = await User.findOneAndUpdate(
		{
			_id: user._id,
			resetPasswordCode: user.resetPasswordCode,
			resetPasswordExpires: { $gt: new Date() },
			resetPasswordAttempts: { $lt: MAX_RESET_CODE_ATTEMPTS },
		},
		{
			$unset: { resetPasswordCode: 1, resetPasswordExpires: 1 },
			$set: { password: passwordHash, resetPasswordAttempts: 0 },
			$inc: { tokenVersion: 1 },
		},
		{ returnDocument: "after", runValidators: true },
	);
	if (!updatedUser) throw new AppError("Reset code is invalid or expired", 400);
	return { message: "Password reset successfully. Sign in with your new password." };
};

export const changePassword = async (userId, { currentPassword, newPassword }) => {
	const user = await User.findById(userId).select("+password +tokenVersion");
	if (!user || !(await user.comparePassword(currentPassword))) {
		throw new AppError("Current password is incorrect", 400);
	}
	if (await user.comparePassword(newPassword)) {
		throw new AppError("New password must be different from the current password", 400);
	}

	const passwordHash = await bcrypt.hash(newPassword, await bcrypt.genSalt(12));
	const updatedUser = await User.findOneAndUpdate(
		{
			_id: user._id,
			$or: [
				{ tokenVersion: user.tokenVersion ?? 0 },
				{ tokenVersion: { $exists: false } },
			],
		},
		{ $set: { password: passwordHash }, $inc: { tokenVersion: 1 } },
		{ returnDocument: "after", runValidators: true },
	);
	if (!updatedUser) throw new AppError("Password changed concurrently; sign in again", 409);
	return { message: "Password changed successfully. Sign in again." };
};

export const getCurrentUser = (user) => ({
	id: String(user._id),
	name: user.name,
	email: user.email,
	role: user.role,
	verified: user.verified,
});
