import mongoose from "mongoose";
import axios from "axios";
import jwt from "jsonwebtoken";
import "dotenv/config";
import app from "../../app.js";
import User from "../../models/user.model.js";
import { createVerificationCode } from "../../utils/email.js";
import { resetPassword } from "../../services/auth.service.js";

let server;
let baseURL;
let user;
let originalJwtSecret;
let originalEmailSecret;

beforeAll(async () => {
	const testDatabaseUrl = process.env.MONGODB_URL_TEST;
	if (!testDatabaseUrl) throw new Error("MONGODB_URL_TEST must point to a dedicated test database");
	const databaseName = new URL(testDatabaseUrl).pathname.replace(/^\/+/, "");
	if (!/(^|[_-])test($|[_-])/i.test(databaseName)) {
		throw new Error("Refusing to run tests: database name must clearly include 'test'");
	}

	originalJwtSecret = process.env.JWT_SECRET;
	originalEmailSecret = process.env.EMAIL_VERIFICATION_SECRET;
	process.env.JWT_SECRET = "auth-api-test-jwt-secret-with-at-least-32-bytes";
	process.env.EMAIL_VERIFICATION_SECRET = "auth-api-test-email-secret-with-at-least-32-bytes";
	await mongoose.connect(testDatabaseUrl);
	user = await new User({
		name: "Verified Test User",
		email: "verified-auth-test@example.com",
		password: "a-strong-test-password-123",
		verified: true,
	}).save();

	server = app.listen(0);
	baseURL = `http://127.0.0.1:${server.address().port}`;
});

afterAll(async () => {
	if (mongoose.connection.readyState === 1) {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	}
	if (server) await new Promise((resolve) => server.close(resolve));
	if (originalJwtSecret === undefined) delete process.env.JWT_SECRET;
	else process.env.JWT_SECRET = originalJwtSecret;
	if (originalEmailSecret === undefined) delete process.env.EMAIL_VERIFICATION_SECRET;
	else process.env.EMAIL_VERIFICATION_SECRET = originalEmailSecret;
});

const createAdminSession = async (email) => {
	const admin = await new User({
		name: "User Management Admin",
		email,
		password: "a-strong-admin-password-123",
		role: "admin",
		verified: true,
	}).save();
	return { admin, headers: { Authorization: `Bearer ${createTestToken(admin)}` } };
};

const createTestToken = (user, tokenVersion = 0) => jwt.sign(
	{ sub: String(user._id), ver: tokenVersion },
	process.env.JWT_SECRET,
	{ algorithm: "HS256", expiresIn: "15m" },
);

describe("authentication", () => {
	it("rejects access to the current-user route without a token", async () => {
		await expect(axios.get(`${baseURL}/api/auth/me`)).rejects.toMatchObject({
			response: { status: 401 },
		});
	});

	it("signs in and returns the current user without exposing the password", async () => {
		const { data: login } = await axios.post(`${baseURL}/api/auth/login`, {
			email: user.email,
			password: "a-strong-test-password-123",
		});

		expect(login.tokenType).toBe("Bearer");
		expect(login.accessToken).toEqual(expect.any(String));
		expect(login.user).not.toHaveProperty("password");

		const { data: profile } = await axios.get(`${baseURL}/api/auth/me`, {
			headers: { Authorization: `Bearer ${login.accessToken}` },
		});
		expect(profile.user).toMatchObject({
			id: String(user._id),
			email: user.email,
			verified: true,
		});
		expect(profile.user).not.toHaveProperty("password");
	});

	it("rejects incorrect credentials", async () => {
		await expect(
			axios.post(`${baseURL}/api/auth/login`, {
				email: user.email,
				password: "incorrect-password",
			}),
		).rejects.toMatchObject({ response: { status: 401 } });
	});

	it("validates email once and rejects replay of the same code", async () => {
		process.env.EMAIL_VERIFICATION_SECRET = "auth-api-test-email-secret-with-at-least-32-bytes";
		const challenge = createVerificationCode();
		const pendingUser = await new User({
			name: "Pending Test User",
			email: "pending-auth-test@example.com",
			password: "a-strong-test-password-456",
			verificationToken: challenge.codeHash,
			verificationExpires: challenge.expiresAt,
		}).save();

		const payload = { email: pendingUser.email, code: challenge.code };
		const verifiedResponse = await axios.post(`${baseURL}/api/auth/verify-email`, payload);
		expect(verifiedResponse.status).toBe(200);
		expect((await User.findById(pendingUser._id)).verified).toBe(true);
		await expect(axios.post(`${baseURL}/api/auth/verify-email`, payload)).rejects.toMatchObject({
			response: { status: 400 },
		});
	});

	it("rejects registration passwords shorter than the policy", async () => {
		await expect(
			axios.post(`${baseURL}/api/auth/register`, {
				name: "Test Account",
				email: "new-auth-test@example.com",
				password: "shortpw",
				confirmPassword: "shortpw",
			}),
		).rejects.toMatchObject({ response: { status: 400 } });
	});

	it("requires matching registration passwords and does not persist the confirmation", async () => {
		const mismatchedEmail = "mismatched-auth-test@example.com";
		await expect(
			axios.post(`${baseURL}/api/auth/register`, {
				name: "Mismatch Account",
				email: mismatchedEmail,
				password: "a-strong-test-password-789",
				confirmPassword: "a-different-test-password-789",
			}),
		).rejects.toMatchObject({ response: { status: 400 } });
		expect(await User.findOne({ email: mismatchedEmail })).toBeNull();

		const email = "matching-auth-test@example.com";
		const response = await axios.post(`${baseURL}/api/auth/register`, {
			name: "Matching Account",
			email,
			password: "a-strong-test-password-789",
			confirmPassword: "a-strong-test-password-789",
		});
		expect(response.status).toBe(202);
		const registeredUser = await User.findOne({ email }).select("+password");
		expect(registeredUser).not.toBeNull();
		expect(registeredUser.password).not.toBe("a-strong-test-password-789");
		expect(registeredUser.toObject()).not.toHaveProperty("confirmPassword");
	});

	it("resets a password once and revokes access tokens issued before reset", async () => {
		const accessToken = createTestToken(user);
		const challenge = createVerificationCode();
		await User.updateOne(
			{ _id: user._id },
			{
				$set: {
					resetPasswordCode: challenge.codeHash,
					resetPasswordExpires: challenge.expiresAt,
					resetPasswordAttempts: 0,
				},
			},
		);
		const resetRequest = {
			email: user.email,
			code: challenge.code,
			password: "new-strong-test-password-456",
		};

		expect((await axios.post(`${baseURL}/api/auth/reset-password`, resetRequest)).status).toBe(200);
		await expect(axios.post(`${baseURL}/api/auth/reset-password`, resetRequest)).rejects.toMatchObject({
			response: { status: 400 },
		});
		await expect(
			axios.get(`${baseURL}/api/auth/me`, { headers: { Authorization: `Bearer ${accessToken}` } }),
		).rejects.toMatchObject({ response: { status: 401 } });
		const updatedUser = await User.findById(user._id).select("+password");
		expect(await updatedUser.comparePassword("new-strong-test-password-456")).toBe(true);
	});

	it("changes password with the current password and revokes the current session", async () => {
		const currentUser = await User.findById(user._id).select("+tokenVersion");
		const accessToken = createTestToken(currentUser, currentUser.tokenVersion);
		const changeResponse = await axios.patch(
			`${baseURL}/api/auth/change-password`,
			{
				currentPassword: "new-strong-test-password-456",
				newPassword: "changed-strong-password-789",
			},
			{ headers: { Authorization: `Bearer ${accessToken}` } },
		);
		expect(changeResponse.status).toBe(200);
		await expect(
			axios.get(`${baseURL}/api/auth/me`, { headers: { Authorization: `Bearer ${accessToken}` } }),
		).rejects.toMatchObject({ response: { status: 401 } });
		const updatedUser = await User.findById(user._id).select("+password +tokenVersion");
		const updatedAccessToken = createTestToken(updatedUser, updatedUser.tokenVersion);
		await expect(
			axios.patch(
				`${baseURL}/api/auth/change-password`,
				{ currentPassword: "incorrect-password", newPassword: "another-strong-password-123" },
				{ headers: { Authorization: `Bearer ${updatedAccessToken}` } },
			),
		).rejects.toMatchObject({ response: { status: 400 } });
		expect(await updatedUser.comparePassword("changed-strong-password-789")).toBe(true);
	});

	it("locks a reset code after five incorrect attempts", async () => {
		const lockedUser = await new User({
			name: "Reset Lock Test",
			email: "reset-lock-test@example.com",
			password: "a-strong-test-password-987",
			verified: true,
		}).save();
		const challenge = createVerificationCode();
		await User.updateOne(
			{ _id: lockedUser._id },
			{
				$set: {
					resetPasswordCode: challenge.codeHash,
					resetPasswordExpires: challenge.expiresAt,
					resetPasswordAttempts: 0,
				},
			},
		);
		const wrongCode = challenge.code === "000000" ? "000001" : "000000";

		for (let attempt = 0; attempt < 5; attempt += 1) {
			await expect(
				resetPassword({
					email: lockedUser.email,
					code: wrongCode,
					password: "another-long-password-123",
				}),
			).rejects.toMatchObject({ statusCode: 400, message: "Reset code is invalid or expired" });
		}

		const lockedRecord = await User.findById(lockedUser._id).select("+resetPasswordCode +resetPasswordAttempts");
		expect(lockedRecord.resetPasswordCode).toBeUndefined();
		expect(lockedRecord.resetPasswordAttempts).toBe(5);
	});

	it("allows admins to manage users without exposing credentials or granting public admin creation", async () => {
		const { admin, headers } = await createAdminSession("user-management-admin@example.com");
		const currentUser = await User.findById(user._id).select("+tokenVersion");
		const regularHeaders = {
			Authorization: `Bearer ${createTestToken(currentUser, currentUser.tokenVersion)}`,
		};

		await expect(axios.get(`${baseURL}/api/users`)).rejects.toMatchObject({
			response: { status: 401 },
		});
		await expect(axios.get(`${baseURL}/api/users`, { headers: regularHeaders })).rejects.toMatchObject({
			response: { status: 403 },
		});
		await expect(axios.post(
			`${baseURL}/api/users`,
			{
				name: "Admin Attempt",
				email: "public-admin-attempt@example.com",
				password: "a-strong-test-password-456",
				role: "admin",
			},
			{ headers },
		)).rejects.toMatchObject({ response: { status: 400 } });

		const { data: created } = await axios.post(
			`${baseURL}/api/users`,
			{
				name: "Managed Test User",
				email: "managed-test-user@example.com",
				password: "a-strong-test-password-456",
			},
			{ headers },
		);
		expect(created.user).toMatchObject({ role: "user", active: true, verified: false });
		for (const secretField of ["password", "tokenVersion", "verificationToken", "resetPasswordCode"]) {
			expect(created.user).not.toHaveProperty(secretField);
		}

		const { data: listing } = await axios.get(`${baseURL}/api/users?role=user&active=true&page=1&limit=2`, { headers });
		expect(listing.users).toEqual(expect.arrayContaining([
			expect.objectContaining({ id: created.user.id, email: created.user.email }),
		]));
		expect(listing.pagination).toMatchObject({ page: 1, limit: 2 });
		const { data: detail } = await axios.get(`${baseURL}/api/users/${created.user.id}`, { headers });
		expect(detail.user.id).toBe(created.user.id);

		const { data: promoted } = await axios.patch(
			`${baseURL}/api/users/${created.user.id}`,
			{ role: "admin" },
			{ headers },
		);
		expect(promoted.user.role).toBe("admin");
		await expect(axios.patch(`${baseURL}/api/users/${admin.id}`, { active: false }, { headers })).rejects.toMatchObject({
			response: { status: 403 },
		});

		const { data: deactivated } = await axios.patch(
			`${baseURL}/api/users/${created.user.id}`,
			{ active: false },
			{ headers },
		);
		expect(deactivated.user.active).toBe(false);
		const deleted = await axios.delete(`${baseURL}/api/users/${created.user.id}`, { headers });
		expect(deleted.data.user.active).toBe(false);
		expect(await User.exists({ _id: created.user.id })).toBeTruthy();
	});
});
