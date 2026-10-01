const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const ApiError = require("../utils/ApiError");

const signToken = (user) =>
    jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "test-secret", {
        expiresIn: "1d",
    });

const getTokenFromHeader = (req) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
        return null;
    }

    return req.headers.authorization.split(" ")[1];
};

const protect = async (req, res, next) => {
    const token = getTokenFromHeader(req);

    if (!token) {
        return next(ApiError.unauthorized("Please log in to access this route"));
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET || "test-secret");
    } catch (error) {
        return next(ApiError.unauthorized("Invalid or expired token"));
    }

    const userDoc = await User.findById(decoded.id);
    const user = typeof userDoc?.select === "function" ? userDoc.select("-password") : userDoc;

    if (!user) {
        return next(ApiError.unauthorized("The user belonging to this token no longer exists"));
    }

    req.user = user.toObject ? user.toObject() : { ...user };
    delete req.user.password;
    return next();
};

const restrictTo = (...roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return next(ApiError.forbidden("You do not have permission to perform this action"));
    }

    return next();
};

module.exports = { protect, restrictTo, signToken };