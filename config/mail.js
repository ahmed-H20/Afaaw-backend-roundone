const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: Number(process.env.MAIL_PORT) === 465, // 465 = implicit TLS, 587 = STARTTLS
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
});

const verifyMailConnection = async () => {
  await transporter.verify();
  console.log("Mail transporter ready");
};

module.exports = { transporter, verifyMailConnection };
