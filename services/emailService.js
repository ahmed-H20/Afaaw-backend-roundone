const { transporter } = require("../config/mail");
const passwordResetOtpTemplate = require("../templates/emails/passwordResetOtp");
const passwordChangedTemplate = require("../templates/emails/passwordChanged");

const send = async (to, { subject, text, html }) => {
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    text,
    html,
  });
};

const sendPasswordResetOtp = (user, otp, ttlMinutes) =>
  send(
    user.email,
    passwordResetOtpTemplate({ fullName: user.fullName, otp, ttlMinutes }),
  );

const sendPasswordChanged = (user) =>
  send(user.email, passwordChangedTemplate({ fullName: user.fullName }));

module.exports = { sendPasswordResetOtp, sendPasswordChanged };
