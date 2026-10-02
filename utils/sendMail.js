const nodemailer = require("nodemailer");

// 1- create mail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ahmedheshamahah8@gmail.com",
    pass: "vpze vdet hxti lmie",
  },
});

const sendEmail = async (resetCode) => {
  // 2- send mail
  const result = await transporter.sendMail({
    from: "Ahmed",
    to: "ahmed33632d1@gmail.com",
    subject: "Your pass reset code (valid 10 min)",
    text: `your code is ${resetCode}`,
  });

  if (!result) {
    return Error("field to send email");
  }

  console.log("email is sent 💌");
};

module.exports = sendEmail;
