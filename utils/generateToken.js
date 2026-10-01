const jwt = require("jsonwebtoken");
// jsonwebtoken geneartes the header and signature of the token.... I give the payload only

exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};
