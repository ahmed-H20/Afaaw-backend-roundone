const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const AppError = require("../errors/AppError");
const { generateToken, generateRefreshToken } = require("../utils/generateToken");

const register = async (req, res, next) => {
  try {
    const { username, email, password, role, fullName } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return next(
          new AppError("User with this email already exists", 400)
        );
      }
      return next(
        new AppError("User with this username already exists", 400)
      );
    }

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      role: role || "user",
      fullName: fullName || username,
    });

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
      token,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, username, identifier, password } = req.body;
    const loginIdentifier = email || username || identifier;

    if (!loginIdentifier || !password) {
      return next(
        new AppError("Please provide email/username and password", 400)
      );
    }

    const user = await User.findOne({
      $or: [
        { email: loginIdentifier.toLowerCase() },
        { username: loginIdentifier },
      ],
    }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError("Invalid email/username or password", 401));
    }

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user,
      token,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};




module.exports = {
  register,
  login,
};
