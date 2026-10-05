import {
	createVerificationCode,
	verifyVerificationCode,
} from "../../utils/email.js";

const secret = process.env.EMAIL_VERIFICATION_SECRET;

beforeAll(() => {
	process.env.EMAIL_VERIFICATION_SECRET = "unit-test-secret-with-at-least-32-characters";
});

afterAll(() => {
	if (secret === undefined) {
		delete process.env.EMAIL_VERIFICATION_SECRET;
	} else {
		process.env.EMAIL_VERIFICATION_SECRET = secret;
	}
});

describe("verification code helpers", () => {
	it("creates a six-digit code with a hash and expiry", () => {
		const challenge = createVerificationCode();

		expect(challenge.code).toMatch(/^\d{6}$/);
		expect(challenge.codeHash).toMatch(/^[a-f\d]{64}$/);
		expect(challenge.expiresAt.getTime()).toBeGreaterThan(Date.now());
	});

	it("accepts a valid code and rejects mismatches or expired codes", () => {
		const challenge = createVerificationCode();
		const incorrectCode = (Number(challenge.code) + 1).toString().padStart(6, "0");

		expect(verifyVerificationCode(challenge)).toBe(true);
		expect(verifyVerificationCode({ ...challenge, code: incorrectCode })).toBe(false);
		expect(
			verifyVerificationCode({ ...challenge, expiresAt: new Date(Date.now() - 1) }),
		).toBe(false);
	});

	it("rejects malformed codes and invalid expiry values", () => {
		const challenge = createVerificationCode();

		expect(verifyVerificationCode({ ...challenge, code: "123" })).toBe(false);
		expect(verifyVerificationCode({ ...challenge, expiresAt: "invalid" })).toBe(false);
	});
});
