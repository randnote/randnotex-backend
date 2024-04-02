"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
// import emailPassword from "../../password";
var hbs = require("nodemailer-express-handlebars");
var fs = require("fs");
var path = require("path");
var transporter = nodemailer_1.default.createTransport({
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
exports.default = transporter;
//# sourceMappingURL=email.config.js.map
