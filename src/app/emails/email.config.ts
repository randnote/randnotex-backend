import nodemailer from "nodemailer";
// import emailPassword from "../../password";
const hbs = require("nodemailer-express-handlebars");

const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	// service: "gmail",
	auth: {
		user: "randnotex@gmail.com",
		pass: "..", // naturally, replace both with your real credentials or an application-specific password
	},
	tls: { rejectUnauthorized: false },
});

transporter.use(
	"compile",
	hbs({
		viewEngine: "express-handlebars",
		viewPath: "./emailtemplates",
	})
);

export default transporter;
