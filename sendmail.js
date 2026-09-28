const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail", // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: "ahmedheshamahah8@gmail.com",
    pass: "wocn lkpf qmmr tahv",
  },
});

const sendMail = async () => {
  const emailOptions = {
    from: "Ahmed",
    to: "ahmedheshamahah2003@gmail.com",
    subject: "your password reset code (valid for 10 min)",
    text: `your code is 3325115`,
  };

  // Send mail
  const result = await transporter.sendMail(emailOptions);
  if (!result) {
    return Error(`Field to send email to ${options.email}`);
  }
  console.log("mail is sent 💌");
};

sendMail();
