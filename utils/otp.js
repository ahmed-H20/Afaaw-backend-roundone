const crypto = require("crypto");

const generateOtp = () =>
  crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");

const generateResetToken = () => crypto.randomBytes(32).toString("hex");

// Store only the hash. If the database leaks, the stored value can't be
// replayed against the API.
const hash = (value) => crypto.createHash("sha256").update(value).digest("hex");

module.exports = { generateOtp, generateResetToken, hash };
