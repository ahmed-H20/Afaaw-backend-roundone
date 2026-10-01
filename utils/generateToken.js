const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  return jwt.sign(
    { _id: user.id, role: user.role, name: user.name },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRE_TIME },
  );
};
