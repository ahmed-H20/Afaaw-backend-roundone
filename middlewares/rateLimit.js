const rateLimit = require("express-rate-limit");

// Per-IP ceiling. The per-account attempt counter in verifyResetOtp is the
// real defense; this stops someone cycling through many accounts.
// express-rate-limit v7+ calls this `limit` (`max` is a deprecated alias).
const passwordResetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5,
  message: { success: false, message: "Too many attempts, try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: {
    success: false,
    message: "Too many login attempts, try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { passwordResetLimiter, loginLimiter };
