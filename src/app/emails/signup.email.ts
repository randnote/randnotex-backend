import nodemailer from "nodemailer";
import transporter from "./email.config";

const mailOptions = {
	from: "randnotex@gmail.com",
	to: "danielromeo99@gmail.com",
	subject: "Welcome to Randnote!",
	text: "Dudes, this is a test email",
	template: 'signup'
};

transporter.sendMail(mailOptions, function (error: any, info: any) {
	if (error) {
		console.log(error);
	} else {
		console.log("Email sent: " + info.response);
	}
});
