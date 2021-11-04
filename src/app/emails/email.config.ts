import nodemailer from "nodemailer";
require("custom-env").env();

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "macbaseco@gmail.com",
		pass: process.env.EMAILPASSWORD, // naturally, replace both with your real credentials or an application-specific password
	},
});
