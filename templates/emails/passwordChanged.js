const escapeHtml = require("../../utils/escapeHtml");

// Sent after a successful reset. This is a security notice, not a courtesy -
// it is how someone finds out their account was taken over.
module.exports = ({ fullName }) => ({
  subject: "Your password was changed",
  text:
    `Hi ${fullName},\n\n` +
    `Your password was just changed. You are now signed out everywhere else.\n\n` +
    `If this wasn't you, reset your password immediately and contact support.`,
  html: `
    <div style="font-family:system-ui,sans-serif;max-width:480px">
      <h2>Password changed</h2>
      <p>Hi ${escapeHtml(fullName)},</p>
      <p>Your password was just changed. You are now signed out everywhere else.</p>
      <p style="color:#b00020;font-weight:600">
        If this wasn't you, reset your password immediately and contact support.
      </p>
    </div>`,
});
