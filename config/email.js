import nodemailer from "nodemailer";

let transporter;

const getEmailTransporter = () => {
	if (transporter) return transporter;

	const { SMTP_USER, SMTP_PASSWORD } = process.env;
	if (!SMTP_USER || !SMTP_PASSWORD) {
		throw new Error("Email transport is not configured. Set SMTP_USER, and SMTP_PASSWORD.");
	}

	transporter = nodemailer.createTransport({
		service: "gmail", 
		auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
	});

	return transporter;
};

export default getEmailTransporter;