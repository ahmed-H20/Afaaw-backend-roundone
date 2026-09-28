const jwt = require("jsonwebtoken");

// A JWT is signed, not encrypted - anyone holding it can read the payload.
const issueTokens = (user) => ({
  accessToken: jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  }),
  refreshToken: jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  }),
});

const verifyAccessToken = (token) =>
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

const verifyRefreshToken = (token) =>
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

module.exports = { issueTokens, verifyAccessToken, verifyRefreshToken };
