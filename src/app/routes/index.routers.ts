import { Application } from "express";

module.exports = (app: Application) => {
	const User = require("../controllers/users.controller");
	const Transactions = require("../controllers/transactions.controller");

	//users
	app.post("/userlogin", User.login);
	app.post("/usercreate", User.create);
	app.get("/userfindall", User.findAll);
	app.get("/user/:userId", User.findOne);

	// transactions
	app.post("/transaction", User.create); // make a transaction
	app.post("/transactions", User.findAll); // get  all transactions
	app.post("/transactions/:userId", User.findOne); // make a transaction

	// cards
	// app.post("/card", Card.create); // add a card
	// app.post("/card", Card.create); // add a card
};	
