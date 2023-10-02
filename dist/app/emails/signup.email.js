"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
var email_config_1 = __importDefault(require("./email.config"));
var mailOptions = {
	from: "randnotex@gmail.com",
	to: "danielromeo99@gmail.com",
	subject: "Welcome to Randnote!",
	text: "Dudes, this is a test email",
	template: "signup",
};
email_config_1.default.sendMail(mailOptions, function (error, info) {
	if (error) {
		console.log(error);
	} else {
		console.log("Email sent: " + info.response);
	}
});
//# sourceMappingURL=signup.email.js.map
