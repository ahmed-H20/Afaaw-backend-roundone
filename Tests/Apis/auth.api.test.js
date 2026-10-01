const express = require("express");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../../models/userModels");
const { protect, restrictTo } = require("../../middleware/auth");
const userService = require("../../services/userService");
const globalErrorHandler = require("../../middleware/globalErrorHandler");

const makeUser = (overrides = {}) => ({
    _id: "67c8d5f9b5d8d3a5d88d16d1",
    fullName: "Test User",
    email: "test@example.com",
    role: "user",
    password: "hashedPassword",
    toObject() {
        return { ...this, password: undefined };
    },
    toJSON() {
        return { ...this, password: undefined };
    },
    ...overrides,
});

describe("auth middleware", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("sends an OTP to a registered user email", async () => {
        const sendMail = jest.fn().mockResolvedValue({ messageId: "test-otp" });
        jest.spyOn(nodemailer, "createTransport").mockReturnValue({ sendMail });
        jest.spyOn(User, "findOne").mockResolvedValue({
            _id: "user-123",
            email: "test@example.com",
            save: jest.fn().mockResolvedValue(true),
        });

        const req = { body: { email: "test@example.com" } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        await userService.forgotPassword(req, res, next);

        expect(sendMail).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                status: "success",
                message: expect.stringContaining("OTP"),
            }),
        );
    });

    it("rejects requests without a valid bearer token", async () => {
        const app = express();
        app.use(express.json());
        app.get("/private", protect, (req, res) => res.status(200).json({ ok: true }));
        app.use(globalErrorHandler);

        const response = await request(app).get("/private");

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Please log in to access this route");
    });

    it("allows valid tokens and excludes password from req.user", async () => {
        const app = express();
        const user = makeUser({ role: "admin" });
        jest.spyOn(User, "findById").mockResolvedValue(user);

        app.use(express.json());
        app.get("/private", protect, (req, res) => res.status(200).json({ user: req.user }));
        app.use(globalErrorHandler);

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "test-secret", { expiresIn: "1h" });
        const response = await request(app).get("/private").set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.user.password).toBeUndefined();
        expect(response.body.user.role).toBe("admin");
    });

    it("blocks non-admin users from admin-only routes", async () => {
        const app = express();
        app.use(express.json());
        app.use((req, res, next) => {
            req.user = makeUser({ role: "user" });
            next();
        });
        app.get("/admin", restrictTo("admin"), (req, res) => res.status(200).json({ ok: true }));
        app.use(globalErrorHandler);

        const response = await request(app).get("/admin");

        expect(response.status).toBe(403);
        expect(response.body.message).toBe("You do not have permission to perform this action");
    });
});
