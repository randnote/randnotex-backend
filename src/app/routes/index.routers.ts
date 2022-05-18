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

	// transactionBlockchain
	app.post("/transactionBlockchain", Transactions.create); // make a transaction
	app.get("/transactionBlockchain", Transactions.findAll); // get all transactions to blockchain
	app.get("/transactionBlockchain/:user_id", Transactions.findAll); // get all transactions per user

	// transactionWebsite
	app.post("/transactionWebsite", Transactions.create); // make a transaction
	app.get("/transactionWebsite/:user_id", Transactions.findAll); // get all transactions per user

	// cards
	app.post("/card", Card.create); // add a card
};
