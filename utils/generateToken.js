const jwt = require("jsonwebtoken");
const generateToken = (user) => {
  const payload = {
    id: user._id ? user._id.toString() : user.id,
    email: user.email,
    role: user.role || "user",
  };

  const secret = process.env.JWT_SECRET || "default_jwt_secret_key";
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

  return jwt.sign(payload, secret, { expiresIn });
};

const generateRefreshToken = (user) => {
  const payload = {
    id: user._id ? user._id.toString() : user.id,
  };

  const secret =
    process.env.JWT_REFRESH_SECRET ||
    process.env.JWT_SECRET ||
    "default_jwt_refresh_secret";
  const expiresIn = process.env.JWT_REFRESH_EXPIRES_IN || "30d";

  return jwt.sign(payload, secret, { expiresIn });
};

module.exports = {
  generateToken,
  generateRefreshToken,
};
