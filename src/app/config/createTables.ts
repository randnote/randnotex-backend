// import queries:
import { createUsers } from "./tables/createTable.users";
import { createAddresses } from "./tables/createTable.addresses";
import { createCards } from "./tables/createTable.cards";
import {
	createTransactionBlockchain,
	createTransactionWebsite,
} from "./tables/createTable.transactions";
import { createWithdrawalsTable } from "./tables/createTable.withdrawals";
import { createDepositsTable } from "./tables/createTable.deposits";

// import mysql functions:
const mysql = require("mysql");
const dbConfig = require("./db.config");

// Create a connection to the database
const connection = mysql.createConnection({
	host: dbConfig.HOST,
	user: dbConfig.USER,
	password: dbConfig.PASSWORD,
	database: dbConfig.DB,
});

// connect to the MySQL server
connection.connect((err: Error) => {
	if (err) {
		return console.error("error: " + err.message);
	}

	const createTable = (query: string, msg: string) => {
		connection.query(
			query,
			function (err: Error, results: any, fields: any) {
				if (err) {
					console.log(err.message);
				} else {
					console.log(msg);
				}
			}
		);
	};

	console.log("Successfully connected to the database.");
	createTable(createUsers, "Successfully created the users table");
	createTable(createAddresses, "Successfully created the addresses table");
	createTable(createCards, "Successfully created the cards table");
	createTable(
		createTransactionBlockchain,
		"Successfully created the transactionsBlockchain table"
	);
	createTable(
		createTransactionWebsite,
		"Successfully created the transactionsWebsite table"
	);
	createTable(
		createWithdrawalsTable,
		"Successfully created the withdrawals table"
	);
	createTable(createDepositsTable, "Successfully created the deposits table");
});
