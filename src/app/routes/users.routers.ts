import { Application } from "express";

module.exports = (app: Application) => {
	const User = require("../controllers/admin.controller");

	app.post("/userlogin", User.login);
	app.post("/usercreate", User.create);
	app.get("/userfindall", User.findAll);
	app.get("/user/:userId", User.findOne);
};
