import { Application } from "express";

module.exports = (app: Application) => {
	const User = require("../controllers/users.controller");
	const Transactions = require("../controllers/transactions.controller");
	const Card = require("../controllers/cards.controller");

	//users
	app.post("/userlogin", User.login);
	app.post("/usercreate", User.create);
	app.get("/userfindall", User.findAll);
	app.get("/user/:userId", User.findOne);

	// get users that are auto generated... (meaning, that have the email address : johnDoe@randnotex.com)
	app.get("/userfindAutoGens", User.findAutoGens)

	// transactions
	app.post("/transaction", User.create); // make a transaction
	app.post("/transactions", User.findAll); // get  all transactions
	app.post("/transactions/:userId", User.findOne); // make a transaction

	// cards
	app.post("/card", Card.create); // add a card
	// app.post("/card", Card.create); // add a card
};
