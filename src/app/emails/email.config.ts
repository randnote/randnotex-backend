import nodemailer from "nodemailer";
import emailPassword from "../../password";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "randnotex@gmail.com",
		pass:emailPassword // naturally, replace both with your real credentials or an application-specific password
	},
});

const water= () =>{
	console.log(emailPassword)
}

export default water;



