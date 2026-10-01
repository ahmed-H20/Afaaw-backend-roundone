const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const User = require("../models/userModels");
const ApiError = require("../utils/ApiError");

const signToken = (user) =>
    jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

const sendOtpEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your password reset OTP",
        html: `
      <h3>Password Reset Request</h3>
      <p>Your OTP is <strong>${otp}</strong></p>
      <p>This OTP is valid for 10 minutes.</p>
    `,
    });
};

const saveOtpHash = async (user, otp) => {
    if (typeof user.setPasswordResetOtp === "function") {
        await user.setPasswordResetOtp(otp);
        return;
    }

    user.passwordResetOtp = await bcrypt.hash(otp, 12);
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
};

const isValidOtp = async (user, otp) => {
    if (typeof user.comparePasswordResetOtp === "function") {
        return user.comparePasswordResetOtp(otp);
    }

    if (!user.passwordResetOtp || !user.passwordResetExpires) {
        return false;
    }

    const isValidHash = await bcrypt.compare(String(otp), user.passwordResetOtp);
    return isValidHash && Date.now() <= user.passwordResetExpires;
};

const createUser = async (req, res, next) => {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password) {
        return next(new ApiError(400, "fullName, email and password are required"));
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
        return next(new ApiError(409, "Email already registered"));
    }

    const user = await User.create({ fullName, email: email.toLowerCase(), password, role });
    const token = signToken(user);

    return res.status(201).json({
        status: "success",
        token,
        user,
    });
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ApiError(400, "Email and password are required"));
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
        return next(new ApiError(401, "Invalid email or password"));
    }

    const token = signToken(user);

    return res.status(200).json({
        status: "success",
        token,
        user,
    });
};

const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return next(new ApiError(400, "Email is required"));
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
        return next(new ApiError(404, "No user found with this email"));
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    await saveOtpHash(user, otp);
    await user.save();

    await sendOtpEmail(user.email, otp);

    return res.status(200).json({
        status: "success",
        message: "OTP sent to your email. Please check your inbox.",
    });
};

const verifyOtp = async (req, res, next) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return next(new ApiError(400, "Email and OTP are required"));
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+passwordResetOtp +passwordResetExpires");

    if (!user) {
        return next(new ApiError(404, "User not found"));
    }

    const isOtpValid = await isValidOtp(user, otp);

    if (!isOtpValid) {
        return next(new ApiError(400, "Invalid or expired OTP"));
    }

    return res.status(200).json({
        status: "success",
        message: "OTP verified successfully",
    });
};

const resetPassword = async (req, res, next) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return next(new ApiError(400, "Email, OTP and newPassword are required"));
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password +passwordResetOtp +passwordResetExpires");

    if (!user) {
        return next(new ApiError(404, "User not found"));
    }

    const isOtpValid = await isValidOtp(user, otp);

    if (!isOtpValid) {
        return next(new ApiError(400, "Invalid or expired OTP"));
    }

    user.password = newPassword;
    user.passwordResetOtp = null;
    user.passwordResetExpires = null;
    await user.save();

    return res.status(200).json({
        status: "success",
        message: "Password reset successfully",
    });
};

const getUserById = async (req, res, next) => {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
        return next(new ApiError(404, "User not found"));
    }

    return res.status(200).json({ status: "success", user });
};

const getMe = async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");

    return res.status(200).json({
        status: "success",
        user,
    });
};

module.exports = {
    createUser,
    loginUser,
    forgotPassword,
    verifyOtp,
    resetPassword,
    getUserById,
    getMe,
    signToken,
};
