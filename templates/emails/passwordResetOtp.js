const escapeHtml = require("../../utils/escapeHtml");

// A template is a pure function: data in, { subject, text, html } out.
// No mailer, no user model - trivially testable.
module.exports = ({ fullName, otp, ttlMinutes }) => ({
  subject: "Your password reset code",
  text:
    `Hi ${fullName},\n\n` +
    `Your password reset code is ${otp}. It expires in ${ttlMinutes} minutes.\n\n` +
    `If you didn't request this, you can ignore this email.`,
  // fullName is user input - escape it. The plain text version needs no
  // escaping, there is no markup to break out of.
  html: `
    <div style="font-family:system-ui,sans-serif;max-width:480px">
      <h2>Password reset</h2>
      <p>Hi ${escapeHtml(fullName)},</p>
      <p>Use this code to reset your password:</p>
      <p style="font-size:30px;letter-spacing:6px;font-weight:700">${otp}</p>
      <p>It expires in ${ttlMinutes} minutes.</p>
      <p style="color:#666;font-size:13px">
        If you didn't request this, you can safely ignore this email.
      </p>
    </div>`,
});
