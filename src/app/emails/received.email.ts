import nodemailer from "nodemailer";
import transporter from "./email.config";
// import template from "./templates/signup.template";

const mailOptions = {
	from: "randnotex@gmail.com",
	to: "danielromeo99@gmail.com",
	subject: "Your received 0.00034 Note",
	html: "",
};

transporter.sendMail(mailOptions, function (error: any, info: any) {
	if (error) {
		console.log(error);
	} else {
		console.log("Email sent: " + info.response);
	}
});
