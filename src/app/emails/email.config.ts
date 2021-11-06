import nodemailer from "nodemailer";
import emailPassword from "../../password";

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	// service: "gmail",
	auth: {
		user: "randnotex@gmail.com",
		pass: emailPassword, // naturally, replace both with your real credentials or an application-specific password
	},
	tls: { rejectUnauthorized: false },
});

export default transporter;
