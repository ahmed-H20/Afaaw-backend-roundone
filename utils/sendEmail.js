const nodemailer = require("nodemailer");
const ApiError = require("./ApiError");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransporter({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

exports.sendEmail = async (options) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    text: options.text
  };

  await transporter.sendMail(mailOptions);

  if(!result) {
    throw new ApiError("Failed to send email", 500);
  }

  res.status(200).json({
    status: "success",
    message: "Email sent successfully"
  });
};